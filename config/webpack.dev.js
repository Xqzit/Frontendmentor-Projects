const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: "../dist",
		open: {
			app: {
				name: "chrome",
			},
		},
		hot: true,
	},
	watchOptions: {
		poll: true,
		ignored: "/node_modules/",
	},
	module: {
		rules: [
			// Styles: Inject CSS into the head with source maps
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { sourceMap: true, importLoaders: 1, modules: false },
					},
					{ loader: "postcss-loader", options: { sourceMap: true } },
				],
			},
		],
	},
});
