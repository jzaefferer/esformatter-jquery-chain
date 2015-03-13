var fs = require("fs");
var assert = require("assert");
var esformatter = require("esformatter");
var plugin = require("./plugin");

var codeStr = fs.readFileSync("expected.js").toString();

esformatter.register(plugin);
var formattedCode = esformatter.format(codeStr, {
	preset: "jquery"
});
// fs.writeFileSync("actual.js", formattedCode);
// console.log(formattedCode);
assert.equal(formattedCode, codeStr);
console.log("✓ all good");