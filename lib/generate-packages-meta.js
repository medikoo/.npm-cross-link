"use strict";

const { promisify } = require("util")
    , { resolve }   = require("path")
    , writeFile     = promisify(require("fs").writeFile)
    , GithubApi     = require("@octokit/rest");

const github = new GithubApi(), packagesMapFilename = resolve(__dirname, "./packages-map.json");

const allowedForks = new Set(["maas-schemas", "standard-version"]);

const getReposPage = async ({ page }) => {
	// eslint-disable-next-line camelcase
	const { data } = await github.repos.listForUser({ username: "medikoo", page, per_page: 100 });
	const repos = data
		.filter(repo => !repo.fork || allowedForks.has(repo.name))
		.map(repo => repo.name);
	if (data.length === 100) repos.push(...(await getReposPage({ page: page + 1 })));
	return repos;
};

const namesMap = new Map([
	["maas-schemas", "@maasglobal/maas-schemas"], ["modules-webmake", "webmake"],
	["node-ext", "next"]
]);
const excludes = new Set([
	".emacs.d", ".npm-cross-link", "asynchronous-javascript-interfaces", "commonjs-webmake",
	"dbjs-cluster", "dbjs-copy", "dbjs-file", "dbjs-log", "dbjs-reduce", "el-fast-filelist",
	"el-indent", "el-index", "el-kit", "el-screen", "fb-calendar-puzzle", "github-news-reader",
	"google-group-reader", "kind-of-javascript", "medikoo.com", "meetjs.pl",
	"oldnabble-group-reader", "onejs.org", "prettier-elastic-vars-v1.0", "r3pi-shopping-basket",
	"reactive-way", "soundcloud-playlist-manager"
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
	Object.assign(packagesMeta, {
		"aws-ssm-parameter-resolve": {
			repoUrl: "git@github.com:maasglobal/aws-ssm-parameter-resolve.git"
		},
		"@maasglobal/log": { repoUrl: "git@github.com:maasglobal/log.git" },
		"webmake-middleware": { repoUrl: "git@github.com:gillesruppert/webmake-middleware.git" }
	});
	return writeFile(packagesMapFilename, JSON.stringify(packagesMeta, null, 2));
};
