const path = require("path");

// webpack.config.js
var HelloWorldPlugin = require("./HelloWorldPlugin");

module.exports = {
	plugins: [new HelloWorldPlugin({ options: true })],
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	}
};
