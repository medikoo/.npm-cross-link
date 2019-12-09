"use strict";

const setupHuskyHook      = require("./lib/setup-husky-hook")
    , resolvePackagesMeta = require("./lib/packages-meta");

module.exports = (async () => ({
	packagesMeta: await (async () => resolvePackagesMeta())(),
	hooks: { afterPackageInstall: setupHuskyHook },
	userDependencies: ["prettier"],
	toBeCopiedDependencies: ["webpack"]
}))();
