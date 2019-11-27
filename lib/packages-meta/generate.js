"use strict";

const { promisify }                     = require("util")
    , { resolve }                       = require("path")
    , writeFile                         = promisify(require("fs").writeFile)
    , GithubApi                         = require("@octokit/rest")
    , { redirects, excludes, includes } = require("./options");

const github = new GithubApi(), packagesMapFilename = resolve(__dirname, "./meta.generated.json");

const allowedForks = new Set(["standard-version"]);

const getReposPage = async ({ page }) => {
	// eslint-disable-next-line camelcase
	const { data } = await github.repos.listForUser({ username: "medikoo", page, per_page: 100 });
	const repos = data
		.filter(repo => !repo.fork || allowedForks.has(repo.name))
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
	return writeFile(packagesMapFilename, JSON.stringify(packagesMeta, null, 2));
};
