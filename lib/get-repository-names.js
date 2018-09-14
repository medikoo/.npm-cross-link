"use strict";

const memoize   = require("memoizee")
    , GithubApi = require("@octokit/rest");

const github = new GithubApi();

const getReposPage = async ({ page }) => {
	// eslint-disable-next-line camelcase
	const { data } = await github.repos.getForUser({ username: "medikoo", page, per_page: 100 });
	const repos = data.filter(repo => !repo.fork).map(repo => repo.name);
	if (data.length === 100) repos.push(...(await getReposPage({ page: page + 1 })));
	return repos;
};

module.exports = memoize(async () => new Set(await getReposPage({ page: 1 }), { promise: true }));
