"use strict";

const setupPreCommitHook  = require("./lib/setup-pre-commit-hook")
    , setupPrettier       = require("./lib/setup-prettier")
    , resolvePackagesMeta = require("./lib/packages-meta");

module.exports = (async () => ({
	packagesMeta: await (async () => resolvePackagesMeta())(),
	hooks: {
		afterPackageInstall: (...args) =>
			Promise.all([setupPrettier(...args), setupPreCommitHook(...args)])
	},
	userDependencies: ["prettier"],
	toBeCopiedDependencies: ["webpack"]
}))();
