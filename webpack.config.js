/**
 * ==============================================================================
 * WEBPACK BUNDLE CONFIGURATION
 * ==============================================================================
 * Purpose: Bundles extension runtime scripts and copies required static assets
 * into the distributable output directory.
 * Docs: https://webpack.js.org/configuration/
 * ==============================================================================
 */

const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	// ==========================================
	// ENTRY POINTS
	// ==========================================
	// Define one bundle per extension runtime surface.
	entry: {
		"tasks/shorts": "./src/tasks/shorts.js",
		"tasks/watch": "./src/tasks/watch.js",
		background: "./src/background.js",
	},

	// ==========================================
	// OUTPUT STRATEGY
	// ==========================================
	// Emit bundles to dist using entry-key-based filenames.
	output: { path: path.resolve(__dirname, "dist"), filename: "[name].js" },

	// ==========================================
	// MODULE TRANSFORMATION
	// ==========================================
	// Transpile JavaScript files with Babel.
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: { presets: ["@babel/preset-env"] },
				},
			},
		],
	},

	// ==========================================
	// BUILD PLUGINS
	// ==========================================
	// Clean stale assets and copy static extension resources.
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "public/manifest.json"),
					to: path.resolve(__dirname, "dist"),
				},
				{
					from: path.resolve(__dirname, "public/icons"),
					to: path.resolve(__dirname, "dist/icons"),
				},
				{
					from: path.resolve(__dirname, "public/comments.json"),
					to: path.resolve(__dirname, "dist/comments.json"),
				},
			],
		}),
	],

	// ==========================================
	// MODULE RESOLUTION
	// ==========================================
	// Restrict import extension resolution to project-relevant types.
	resolve: { extensions: [".js", ".json"] },

	// ==========================================
	// OPTIMIZATION POLICY
	// ==========================================
	// Minify bundles and enable shared chunk extraction.
	optimization: {
		splitChunks: { chunks: "all" },
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false, // Disable LICENSE.txt file generation
			}),
		],
	},

	// ==========================================
	// SOURCE MAPS
	// ==========================================
	// Generate lightweight source maps for debugging.
	devtool: "cheap-source-map",
};
