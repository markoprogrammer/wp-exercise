const path = require("path");

// webpack.config.js
var ChppTranspilerPlugin = require("./ChppTranspilerPlugin");

module.exports = {
  plugins: [
    new ChppTranspilerPlugin()
  ],
  entry: [
    "./src/index.js"
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
