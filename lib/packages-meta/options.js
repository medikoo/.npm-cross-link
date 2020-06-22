"use strict";

const crypto = require("crypto");

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
	"reactive-way", "soundcloud-playlist-manager", "standard-version"
];

module.exports.includes = {
	"@serverless/aws-dynamodb": {
		repoUrl: "git@github.com:serverless-components/aws-dynamodb.git"
	},
	"@serverless/cli": { repoUrl: "git@github.com:serverless/cli.git" },
	"@serverless/components": { repoUrl: "git@github.com:serverless/components.git" },
	"@serverless/core": { repoUrl: "git@github.com:serverless/components.git" },
	"@serverless/enterprise-plugin": { repoUrl: "git@github.com:serverless/enterprise-plugin.git" },
	"@serverless/eslint-config": { repoUrl: "git@github.com:serverless/eslint-config.git" },
	"@serverless/inquirer": { repoUrl: "git@github.com:serverless/inquirer.git" },
	"@serverless/platform-sdk": { repoUrl: "git@github.com:serverless/platform-sdk.git" },
	"@serverless/template": { repoUrl: "git@github.com:serverless/template.git" },
	"@serverless/tencent-apigateway": {
		repoUrl: "git@github.com:serverless-components/tencent-apigateway.git"
	},
	"@serverless/tencent-cam-policy": {
		repoUrl: "git@github.com:serverless-components/tencent-cam-policy.git"
	},
	"@serverless/tencent-cam-role": {
		repoUrl: "git@github.com:serverless-components/tencent-cam-role.git"
	},
	"@serverless/tencent-cos": { repoUrl: "git@github.com:serverless-components/tencent-cos.git" },
	"@serverless/tencent-express": {
		repoUrl: "git@github.com:serverless-components/tencent-express.git"
	},
	"@serverless/tencent-koa": { repoUrl: "git@github.com:serverless-components/tencent-koa.git" },
	"@serverless/tencent-scf": { repoUrl: "git@github.com:serverless-components/tencent-scf.git" },
	"@serverless/tencent-website": {
		repoUrl: "git@github.com:serverless-components/tencent-website.git"
	},
	"@serverless/test": { repoUrl: "git@github.com:serverless/test.git" },
	"@serverless/user-config": { repoUrl: "git@github.com:serverless/user-config.git" },
	"@serverless/utils": { repoUrl: "git@github.com:serverless/utils.git" },
	"@serverless/utils-china": { repoUrl: "git@github.com:serverlessinc/utils-china.git" },
	"ext": { repoUrl: "git@github.com:medikoo/es5-ext.git" },
	"serverless": { repoUrl: "git@github.com:serverless/serverless.git" },
	"serverless-azure-functions": {
		repoUrl: "git@github.com:serverless/serverless-azure-functions.git"
	},
	"serverless-google-cloudfunctions": {
		repoUrl: "git@github.com:serverless/serverless-google-cloudfunctions.git"
	},
	"serverless-knative": { repoUrl: "git@github.com:serverless/serverless-knative.git" },
	"serverless-tencent-tools": {
		repoUrl: "git@github.com:serverless-tencent/serverless-tencent-tools.git"
	},
	"@serverlessinc/platform-common": {
		repoUrl: "git@github.com:serverlessinc/platform-common.git"
	},

	"webmake-middleware": { repoUrl: "git@github.com:gillesruppert/webmake-middleware.git" }
};

module.exports.hash = crypto.createHash("md5").update(JSON.stringify(module.exports)).digest("hex");
