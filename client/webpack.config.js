const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// const fs = require('fs');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    https: true
    // https: {
    //   key: fs.readFileSync("C:/Users/jan/localhost-key.pem"),
    //   cert: fs.readFileSync("C:/Users/jan/localhost.pem"),
    //   ca: fs.readFileSync("C:/Users/jan/AppData/Local/mkcert/rootCA.pem"),
    // },
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'index.js',
    publicPath: "/",
  },
  plugins: [htmlPlugin],
};
