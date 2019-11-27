"use strict";

const log      = require("log").get("npm-cross-link:user")
    , generate = require("./generate")
    , { hash } = require("./options");

const resolveGenerated = () => {
	try { return require("./meta.generated"); }
	catch (error) { return null; }
};

module.exports = async () => {
	const generatedMeta = resolveGenerated();
	if (generatedMeta && generatedMeta.optionsHash === hash) return generatedMeta.meta;
	if (generatedMeta) log.notice("cached packages map is outdated, refreshing");
	else log.notice("cached packages map not found, resolving");
	return generate();
};
