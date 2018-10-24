"use strict";

const { basename, resolve } = require("path")
    , memoizee              = require("memoizee")
    , log                   = require("log4").get("dev-package:user").info
    , lstat                 = require("fs2/lstat")
    , setupRepository       = require("dev-package/lib/setup-repository")
    , runProgram            = require("dev-package/lib/run-program")
    , setupSymbolicLink     = require("dev-package/lib/setup-symbolic-link");

const setupPrettierPackage = memoizee(
	async (packagesPath, options = {}) => {
		log("setup prettier");
		const prettierPath = resolve(packagesPath, "prettier-elastic");
		await setupRepository(prettierPath, "git@github.com:medikoo/prettier-elastic.git", {
			skipGitUpdate: options.skipNestedGitUpdate || options.skipGitUpdate
		});
		log("install prettier");
		await runProgram("yarn", [], {
			cwd: prettierPath,
			logger: log.levelRoot.get("yarn:install")
		});
	},
	{ promise: true }
);

module.exports = async (packagesPath, packagePath, options) => {
	const symbolicLinkPath = resolve(packagePath, "node_modules/prettier");
	await setupPrettierPackage(packagesPath, options);
	if (await lstat(symbolicLinkPath, { loose: true })) return;
	log("link %s in %s", "prettier", basename(packagePath));
	await setupSymbolicLink(resolve(packagesPath, "prettier-elastic"), symbolicLinkPath);
};
