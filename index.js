"use strict";

const { resolve }        = require("path")
    , { homedir }        = require("os")
    , getRepositoryNames = require("./lib/get-repository-names")
    , setupPrettier      = require("./lib/setup-prettier");

const exceptionsMap = new Map([["modules-webmake", "webmake"], ["node-ext", "next"]]);

module.exports = (async () => {
	const repositoryNames = await getRepositoryNames();
	const packagesMeta = Object.create(null);
	for (const repositoryName of repositoryNames) {
		packagesMeta[exceptionsMap.get(repositoryName) || repositoryName] = {
			repoUrl: `git@github.com:medikoo/${ repositoryName }.git`
		};
	}

	return {
		packagesMeta,
		packagesPath: resolve(homedir(), "Projects", "npm-packages"),
		hooks: {
			afterPackageInstall: (packageName, { packagesPath }) =>
				setupPrettier(packagesPath, resolve(packagesPath, packageName))
		}
	};
})();
