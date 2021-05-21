"use strict";

const path                = require("path")
    , os                  = require("os")
    , setupHuskyHooks     = require("./lib/setup-husky-hooks")
    , resolvePackagesMeta = require("./lib/packages-meta");

module.exports = (async () => ({
	packagesMeta: await (async () => resolvePackagesMeta())(),
	multiPackageReposMeta: {
		"serverlessinc/cloud": {
			repoUrl: "git@github.com:serverlessinc/cloud.git",
			path: path.resolve(os.homedir(), "Projects/serverless/cloud")
		},
		"serverlessinc/platform": {
			repoUrl: "git@github.com:serverlessinc/platform.git",
			path: path.resolve(os.homedir(), "Projects/serverless/platform")
		}
	},
	hooks: { afterPackageInstall: setupHuskyHooks },
	toBeCopiedDependencies: ["webpack"]
}))();
