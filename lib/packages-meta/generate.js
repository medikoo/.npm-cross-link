"use strict";

const { promisify }                           = require("util")
    , { resolve }                             = require("path")
    , writeFile                               = promisify(require("fs").writeFile)
    , { Octokit }                             = require("@octokit/rest")
    , { allowedForks, excludes, includes, redirects, hash } = require("./options");

const github = new Octokit(), packagesMapFilename = resolve(__dirname, "./meta.generated.json");

const getReposPage = async ({ page }) => {
	// eslint-disable-next-line camelcase
	const { data } = await github.repos.listForUser({ username: "medikoo", page, per_page: 100 });
	const repos = data
		.filter(repo => !repo.fork || allowedForks.includes(repo.name))
		.map(repo => repo.name);
	if (data.length === 100) repos.push(...(await getReposPage({ page: page + 1 })));
	return repos;
};

module.exports = async () => {
	const repositoryNames = new Set(await getReposPage({ page: 1 }));
	const packagesMeta = Object.create(null);
	for (const repositoryName of repositoryNames) {
		if (excludes.includes(repositoryName)) continue;
		packagesMeta[redirects[repositoryName] || repositoryName] = {
			repoUrl: `git@github.com:medikoo/${ repositoryName }.git`
		};
	}
	Object.assign(packagesMeta, includes);
	await writeFile(
		packagesMapFilename, JSON.stringify({ optionsHash: hash, meta: packagesMeta }, null, 2)
	);
	return packagesMeta;
};
