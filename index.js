"use strict";

const log                  = require("log").get("npm-cross-link:user").notice
    , generatePackageNames = require("./lib/packages-meta/generate")
    , setupPreCommitHook   = require("./lib/setup-pre-commit-hook")
    , setupPrettier        = require("./lib/setup-prettier");

const argv = require("minimist")(process.argv.slice(2), { boolean: ["refresh-packages-map"] });

module.exports = (async () => ({
	packagesMeta: await (async () => {
		if (argv["refresh-packages-map"]) {
			log("forced refresh of packages map");
		} else {
			try { return require("./lib/packages-meta/meta.generated"); }
			catch (ignore) { log("cached packages map not found, resolving"); }
		}
		await generatePackageNames();
		return require("./lib/packages-meta/meta.generated");
	})(),
	hooks: {
		afterPackageInstall: (...args) =>
			Promise.all([setupPrettier(...args), setupPreCommitHook(...args)])
	},
	userDependencies: ["prettier"],
	toBeCopiedDependencies: ["webpack"]
}))();
