"use strict";

const { resolve }          = require("path")
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
	hooks: {
		afterPackageInstall: (packageName, { packagesPath }) =>
			setupPrettier(packagesPath, resolve(packagesPath, packageName))
	}
}))();
