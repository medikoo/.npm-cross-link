"use strict";

const path                = require("path")
    , os                  = require("os")
    , setupHuskyHooks     = require("./lib/setup-husky-hooks")
    , resolvePackagesMeta = require("./lib/packages-meta");

module.exports = (async () => ({
	packagesMeta: await (async () => resolvePackagesMeta())(),
	multiPackageReposMeta: {
		"medikoo/serverless-chrome": {
			repoUrl: "git@github.com:medikoo/serverless-chrome.git",
			path: path.resolve(os.homedir(), "Projects/serverless/serverless-chrome")
		},
		"serverless/console": {
			repoUrl: "git@github.com:serverless/console.git",
			path: path.resolve(os.homedir(), "Projects/serverless/console"),
			branch: "main"
		},
		"serverlessinc/cloud": {
			repoUrl: "git@github.com:serverlessinc/cloud.git",
			path: path.resolve(os.homedir(), "Projects/serverless/cloud"),
			branch: "main"
		},
		"serverlessinc/platform": {
			repoUrl: "git@github.com:serverlessinc/platform.git",
			path: path.resolve(os.homedir(), "Projects/serverless/platform")
		}
	},
	hooks: { afterPackageInstall: setupHuskyHooks },
	toBeCopiedDependencies: ["webpack"]
}))();
