"use strict";

const setupPreCommitHook  = require("./lib/setup-pre-commit-hook")
    , resolvePackagesMeta = require("./lib/packages-meta");

module.exports = (async () => ({
	packagesMeta: await (async () => resolvePackagesMeta())(),
	hooks: { afterPackageInstall: setupPreCommitHook },
	userDependencies: ["prettier"],
	toBeCopiedDependencies: ["webpack"]
}))();
