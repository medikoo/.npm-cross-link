"use strict";

const { promisify }                                         = require("util")
    , { resolve }                                           = require("path")
    , writeFile                                             = promisify(require("fs").writeFile)
    , { Octokit }                                           = require("@octokit/rest")
    , { allowedForks, excludes, includes, redirects, hash } = require("./options");

const github              = new Octokit({ auth: require("../../.env").GITHUB_TOKEN })
    , packagesMapFilename = resolve(__dirname, "./meta.generated.json")
    , repoUrlRe           = /^git@github.com:(?<owner>[^/]+)\/(?<repo>.+)\.git$/u;

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
	await Promise.all(
		Array.from(repositoryNames, async repositoryName => {
			if (excludes.includes(repositoryName)) return;
			const packageName = redirects[repositoryName] || repositoryName;
			packagesMeta[packageName] = {
				repoUrl: `git@github.com:medikoo/${ repositoryName }.git`,
				branch: (await github.repos.get({ owner: "medikoo", repo: repositoryName })).data
					.default_branch
			};
		}).concat(
			Object.entries(includes).map(async ([packageName, meta]) => {
				packagesMeta[packageName] = meta;
				if (!meta.repoUrl || meta.branch) return;
				const matchResult = meta.repoUrl.match(repoUrlRe);
				if (!matchResult) {
					throw new Error(`Cannot resolve repo meta from: ${ meta.repoUrl }`);
				}
				const { owner, repo } = matchResult.groups;
				packagesMeta[packageName].branch = (
					await github.repos.get({ owner, repo })
				).data.default_branch;
			})
		)
	);
	Object.assign(packagesMeta, includes);
	await writeFile(
		packagesMapFilename, JSON.stringify({ optionsHash: hash, meta: packagesMeta }, null, 2)
	);
	return packagesMeta;
};
