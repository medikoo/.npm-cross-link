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

const resolveSource = memoizee(sourcePath => readFile(sourcePath, "utf8"), { promise: true });

const enabledHooks = new Set(["pre-commit", "commit-msg"]);

const clearPlainHuskyHooks = async hooksPath => {
	const hooks = new Set(
		await readdir(hooksPath, {
			type: { file: true },
			pattern: new RegExp(`${ reEscape(sep) }[^.]+$`, "u")
		})
	);
	for (const hookName of enabledHooks) hooks.delete(hookName);
	await Promise.all(
		Array.from(hooks, async hook => {
			const hookPath = resolve(hooksPath, hook);
			if (!(await readFile(hookPath, "utf8")).includes("husky")) {
				return;
			}
			await unlink(hookPath);
		})
	);
};

const setupHooks = memoizee(
	async path => {
		const hooksPath = resolve(path, ".git/hooks");
		await Promise.all([
			clearPlainHuskyHooks(hooksPath),
			...Array.from(enabledHooks, async hookName => {
				const targetHookPath = resolve(hooksPath, hookName);
				const [sourceContent, targetContent, isExecutable] = await Promise.all([
					resolveSource(sourceHookPath),
					readFile(targetHookPath, { loose: true, encoding: "utf8" }),
					hasAccess(targetHookPath, { mode: execMode, loose: true })
				]);
				if (isExecutable && sourceContent === targetContent) return;
				await copy(sourceHookPath, targetHookPath, { force: true });
			}),
			["husky.sh", "husky.local.sh"].map(async helperName => {
				const targetPath = resolve(hooksPath, helperName)
				    , sourcePath = resolve(__dirname, helperName);
				const [sourceContent, targetContent] = await Promise.all([
					resolveSource(sourcePath),
					readFile(targetPath, { loose: true, encoding: "utf8" })
				]);
				if (sourceContent === targetContent) return;
				await copy(sourcePath, targetPath, { force: true });
			})
		]);
	},
	{ promise: true }
);

module.exports = async (packageContext, { multiPackageReposMeta }) =>
	setupHooks(
		(packageContext.meta.multiPackageRepoName
			? multiPackageReposMeta[packageContext.meta.multiPackageRepoName]
			: packageContext
		).path
	);
