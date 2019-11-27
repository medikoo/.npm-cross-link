"use strict";

module.exports.redirects = Object.assign(Object.create(null), {
	"modules-webmake": "webmake",
	"node-ext": "next"
});

module.exports.excludes = [
	".emacs.d", ".npm-cross-link", "asynchronous-javascript-interfaces", "commonjs-webmake",
	"dbjs-cluster", "dbjs-copy", "dbjs-file", "dbjs-log", "dbjs-reduce", "el-fast-filelist",
	"el-indent", "el-index", "el-kit", "el-screen", "fb-calendar-puzzle", "github-news-reader",
	"google-group-reader", "kind-of-javascript", "medikoo.com", "meetjs.pl",
	"oldnabble-group-reader", "onejs.org", "prettier-elastic-vars-v1.0", "r3pi-shopping-basket",
	"reactive-way", "soundcloud-playlist-manager"
];

module.exports.includes = {
	"@serverless/cli": { repoUrl: "git@github.com:serverless/cli.git" },
	"@serverless/core": { repoUrl: "git@github.com:serverless/components.git" },
	"@serverless/enterprise-plugin": { repoUrl: "git@github.com:serverless/enterprise-plugin.git" },
	"@serverless/eslint-config": { repoUrl: "git@github.com:serverless/eslint-config.git" },
	"@serverless/platform-sdk": { repoUrl: "git@github.com:serverless/platform-sdk.git" },
	"@serverless/template": { repoUrl: "git@github.com:serverless/template.git" },
	"@serverless/tencent-apigateway": {
		repoUrl: "git@github.com:serverless-tencent/tencent-apigateway.git"
	},
	"@serverless/tencent-cam-policy": {
		repoUrl: "git@github.com:serverless-tencent/tencent-cam-policy.git"
	},
	"@serverless/tencent-cam-role": {
		repoUrl: "git@github.com:serverless-tencent/tencent-cam-role.git"
	},
	"@serverless/tencent-cos": { repoUrl: "git@github.com:serverless-tencent/tencent-cos.git" },
	"@serverless/tencent-express": {
		repoUrl: "git@github.com:serverless-tencent/tencent-express.git"
	},
	"@serverless/tencent-scf": { repoUrl: "git@github.com:serverless-tencent/tencent-scf.git" },
	"@serverless/tencent-website": {
		repoUrl: "git@github.com:serverless-tencent/tencent-website.git"
	},
	"@serverless/test": { repoUrl: "git@github.com:serverless/test.git" },
	"ext": { repoUrl: "git@github.com:medikoo/es5-ext.git" },
	"serverless": { repoUrl: "git@github.com:serverless/serverless.git" },
	"serverless-azure-functions": {
		repoUrl: "git@github.com:serverless/serverless-azure-functions.git"
	},
	"webmake-middleware": { repoUrl: "git@github.com:gillesruppert/webmake-middleware.git" }
};
