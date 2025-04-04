const path = require("path");

module.exports = {
  mode: "development", // production or development
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname), // index.html 파일이 있는 위치
    },
  },
};
