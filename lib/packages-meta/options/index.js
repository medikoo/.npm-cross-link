"use strict";

const crypto = require("crypto");

module.exports.redirects = Object.assign(Object.create(null), {
	"modules-webmake": "webmake",
	"node-ext": "next"
});

module.exports.allowedForks = [
	"serverless-add-api-key", "serverless-apigwy-binary", "serverless-domain-manager",
	"serverless-dotenv-plugin", "serverless-iam-roles-per-function", "serverless-plugin-typescript",
	"serverless-plugin-warmup", "serverless-prune-plugin", "serverless-python-requirements",
	"serverless-ssm-fetch", "serverless-step-functions", "serverless-webpack", "serverless-wsgi"
];

module.exports.excludes = [
	".emacs.d", ".npm-cross-link", "asynchronous-javascript-interfaces", "commonjs-webmake",
	"dbjs-cluster", "dbjs-copy", "dbjs-file", "dbjs-log", "dbjs-reduce", "el-fast-filelist",
	"el-indent", "el-index", "el-kit", "el-screen", "fb-calendar-puzzle", "github-news-reader",
	"google-group-reader", "kind-of-javascript", "medikoo.com", "meetjs.pl",
	"oldnabble-group-reader", "onejs.org", "prettier-elastic-vars-v1.0", "r3pi-shopping-basket",
	"reactive-way", "soundcloud-playlist-manager", "standard-version"
];

module.exports.includes = require("./includes");
module.exports.hash = crypto.createHash("md5").update(JSON.stringify(module.exports)).digest("hex");
