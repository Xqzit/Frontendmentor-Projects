const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].[contenthash].bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: false,
						},
					},
					"postcss-loader",
				],
			},
		],
	},
	plugins: [
		// Extracts CSS into separate files
		new MiniCssExtractPlugin({
			filename: "styles/[name].[contenthash].css",
			chunkFilename: "[id].css",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), "..."],
		runtimeChunk: {
			name: "runtime",
		},
	},
});
