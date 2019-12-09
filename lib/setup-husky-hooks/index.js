"use strict";

const reEscape         = require("es5-ext/reg-exp/escape")
    , { resolve, sep } = require("path")
    , execMode         = require("fs").constants.X_OK
    , memoizee         = require("memoizee")
    , copy             = require("fs2/copy")
    , hasAccess        = require("fs2/has-access")
    , readFile         = require("fs2/read-file")
    , readdir          = require("fs2/readdir")
    , unlink           = require("fs2/unlink");

const sourceHookPath = resolve(__dirname, "hook.sh");

const resolveHookSource = memoizee(() => readFile(sourceHookPath, "utf8"), { promise: true });

const clearPlainHuskyHooks = async hooksPath => {
	const hooks = new Set(
		await readdir(hooksPath, {
			type: { file: true },
			pattern: new RegExp(`${ reEscape(sep) }[^.]+$`, "u")
		})
	);
	hooks.delete("pre-commit");
	await Promise.all(
		Array.from(hooks, async hook => {
			const hookPath = resolve(hooksPath, hook);
			if (!(await readFile(hookPath, "utf8")).includes("node_modules/run-node/run-node")) {
				return;
			}
			await unlink(hookPath);
		})
	);
};

module.exports = async ({ path }) => {
	const hooksPath = resolve(path, ".git/hooks");
	const targetHookPath = resolve(hooksPath, "pre-commit");
	const [sourceContent, targetContent, isExecutable] = await Promise.all([
		resolveHookSource(), readFile(targetHookPath, { loose: true, encoding: "utf8" }),
		hasAccess(targetHookPath, { mode: execMode, loose: true }), clearPlainHuskyHooks(hooksPath)
	]);
	if (isExecutable && sourceContent === targetContent) return;
	await copy(sourceHookPath, targetHookPath, { force: true });
};
