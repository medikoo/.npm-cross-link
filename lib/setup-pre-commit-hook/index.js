"use strict";

const { resolve } = require("path")
    , execMode    = require("fs").constants.X_OK
    , memoizee    = require("memoizee")
    , copy        = require("fs2/copy")
    , hasAccess   = require("fs2/has-access")
    , readFile    = require("fs2/read-file");

const sourceHookPath = resolve(__dirname, "hook.sh");

const resolveHookSource = memoizee(() => readFile(sourceHookPath, "utf8"), { promise: true });

module.exports = async ({ path }) => {
	const targetHookPath = resolve(path, ".git/hooks/pre-commit");
	const [sourceContent, targetContent, isExecutable] = await Promise.all([
		resolveHookSource(), readFile(targetHookPath, { loose: true, encoding: "utf8" }),
		hasAccess(targetHookPath, { mode: execMode, loose: true })
	]);
	if (isExecutable && sourceContent === targetContent) return;
	await copy(sourceHookPath, targetHookPath, { force: true });
};
