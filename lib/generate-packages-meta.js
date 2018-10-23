"use strict";

const { promisify } = require("util")
    , { resolve }   = require("path")
    , writeFile     = promisify(require("fs").writeFile)
    , GithubApi     = require("@octokit/rest");

const github = new GithubApi(), packagesMapFilename = resolve(__dirname, "./packages-map.json");

const getReposPage = async ({ page }) => {
	// eslint-disable-next-line camelcase
	const { data } = await github.repos.getForUser({ username: "medikoo", page, per_page: 100 });
	const repos = data.filter(repo => !repo.fork).map(repo => repo.name);
	if (data.length === 100) repos.push(...(await getReposPage({ page: page + 1 })));
	return repos;
};

const namesMap = new Map([["modules-webmake", "webmake"], ["node-ext", "next"]]);
const excludes = new Set([
	".emacs.d", "asynchronous-javascript-interfaces", "commonjs-webmake", "el-fast-filelist",
	"el-indent", "el-kit", "el-screen", "fb-calendar-puzzle", "github-news-reader",
	"google-group-reader", "kind-of-javascript", "medikoo.com", "meetjs.pl",
	"prettier-elastic-vars-v1.0", "r3pi-shopping-basket", "soundcloud-playlist-manager"
]);

module.exports = async () => {
	const repositoryNames = new Set(await getReposPage({ page: 1 }));
	const packagesMeta = Object.create(null);
	for (const repositoryName of repositoryNames) {
		if (excludes.has(repositoryName)) continue;
		packagesMeta[namesMap.get(repositoryName) || repositoryName] = {
			repoUrl: `git@github.com:medikoo/${ repositoryName }.git`
		};
	}
	return writeFile(packagesMapFilename, JSON.stringify(packagesMeta, null, 2));
};
