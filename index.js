"use strict";

const setupHuskyHooks     = require("./lib/setup-husky-hooks")
    , resolvePackagesMeta = require("./lib/packages-meta");

module.exports = (async () => ({
	packagesMeta: await (async () => resolvePackagesMeta())(),
	hooks: { afterPackageInstall: setupHuskyHooks },
	toBeCopiedDependencies: ["webpack"]
}))();
