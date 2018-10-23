"use strict";

const { resolve }          = require("path")
    , { homedir }          = require("os")
    , generatePackageNames = require("./lib/generate-packages-meta")
    , setupPrettier        = require("./lib/setup-prettier");

module.exports = (async () => ({
	packagesMeta: await (async () => {
		try {
			return require("./lib/packages-map");
		} catch (error) {
			await generatePackageNames();
			return require("./lib/packages-map");
		}
	})(),
	packagesPath: resolve(homedir(), "Projects", "npm-packages"),
	hooks: {
		afterPackageInstall: (packageName, { packagesPath }) =>
			setupPrettier(packagesPath, resolve(packagesPath, packageName))
	}
}))();
