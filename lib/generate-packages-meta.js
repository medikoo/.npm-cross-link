"use strict";

const { promisify } = require("util")
    , { resolve }   = require("path")
    , writeFile     = promisify(require("fs").writeFile)
    , GithubApi     = require("@octokit/rest");

const github = new GithubApi(), packagesMapFilename = resolve(__dirname, "./packages-map.json");

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

const namesMap = new Map([["modules-webmake", "webmake"], ["node-ext", "next"]]);
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
		"@serverless/cli": { repoUrl: "git@github.com:serverless/cli.git" },
		"@serverless/core": { repoUrl: "git@github.com:serverless/core.git" },
		"@serverless/enterprise-plugin": {
			repoUrl: "git@github.com:serverless/enterprise-plugin.git"
		},
		"@serverless/eslint-config": { repoUrl: "git@github.com:serverless/eslint-config.git" },
		"@serverless/platform-sdk": { repoUrl: "git@github.com:serverless/platform-sdk.git" },
		"@serverless/template": { repoUrl: "git@github.com:serverless/template.git" },
		"@serverless/tencent-apigateway": {
			repoUrl: "git@github.com:serverless-tencent/tencent-apigateway.git"
		},
		"@serverless/tencent-cloudfunction": {
			repoUrl: "git@github.com:serverless-tencent/tencent-cloudfunction.git"
		},
		"@serverless/tencent-cos": { repoUrl: "git@github.com:serverless-tencent/tencent-cos.git" },
		"@serverless/tencent-website": {
			repoUrl: "git@github.com:serverless-tencent/tencent-website.git"
		},
		"@serverless/test": { repoUrl: "git@github.com:serverless/test.git" },
		"serverless": { repoUrl: "git@github.com:serverless/serverless.git" },
		"serverless-azure-functions": {
			repoUrl: "git@github.com:serverless/serverless-azure-functions.git"
		},
		"webmake-middleware": { repoUrl: "git@github.com:gillesruppert/webmake-middleware.git" }
	});
	return writeFile(packagesMapFilename, JSON.stringify(packagesMeta, null, 2));
};
