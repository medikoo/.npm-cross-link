"use strict";

const { basename, resolve } = require("path")
    , memoizee              = require("memoizee")
    , log                   = require("log4").get("dev-package:user").info
    , isSymlink             = require("fs2/is-symlink")
    , symlink               = require("fs2/symlink")
    , rm                    = require("fs2/rm")
    , setupRepository       = require("dev-package/lib/setup-repository")
    , runProgram            = require("dev-package/lib/run-program");

const setupPrettierPackage = memoizee(
	async (path, options = {}) => {
		log("setup prettier");
		const wasRepoCloned = await setupRepository(
			path, "git@github.com:medikoo/prettier-elastic.git", options
		);

		if (wasRepoCloned) log("install prettier");
		else if (options.skipGitUpdate) return;
		else log("update prettier");

		await runProgram("yarn", [], { cwd: path, logger: log.levelRoot.get("yarn:install") });
	},
	{ promise: true }
);

module.exports = async ({ path }, { packagesPath }, options) => {
	const symbolicLinkPath = resolve(path, "node_modules/prettier")
	    , linkPath = resolve(packagesPath, "prettier-elastic");
	await setupPrettierPackage(linkPath, options);
	if (await isSymlink(symbolicLinkPath, { linkPath })) return;
	log("link %s in %s", "prettier", basename(path));
	await rm(symbolicLinkPath, { loose: true });
	await symlink(symbolicLinkPath, linkPath, { type: "dir", intermediate: true });
};