const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].bundle.js",
		clean: true,
	},
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: ["babel-loader"],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
		}),
	],
	resolve: {
		modules: ["./src", "./node_modules"],
	},
};
