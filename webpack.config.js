/**
 * ==============================================================================
 * WEBPACK BUNDLE CONFIGURATION
 * ==============================================================================
 * Purpose: Builds the browser extension scripts and copies required static
 * assets into the distributable output directory.
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
	// Why: Defines independent bundles for each extension runtime surface.
	// Default: `entry` defaults to `./src/index.js` if omitted.
	// Use Case: Produces separate scripts for `background`, `tasks/shorts`, and
	// `tasks/watch` used by the extension.
	entry: {
		"tasks/shorts": "./src/tasks/shorts.js",
		"tasks/watch": "./src/tasks/watch.js",
		background: "./src/background.js",
	},

	// ==========================================
	// OUTPUT STRATEGY
	// ==========================================
	// Why: Controls output destination and bundle filename convention.
	// Default: Webpack emits to memory unless `output.path` is specified.
	// Use Case: Writes predictable files into `dist` for extension packaging.
	output: { path: path.resolve(__dirname, "dist"), filename: "[name].js" },

	// ==========================================
	// MODULE TRANSFORMATION
	// ==========================================
	// Why: Transpiles JavaScript for broader runtime compatibility.
	// Default: Without rules, files are bundled without Babel transforms.
	// Use Case: Keeps extension scripts compatible with target browser engines.
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
	// Why: Cleans stale assets and copies extension metadata/static files.
	// Default: Webpack does not clean output or copy static assets by default.
	// Use Case: Ensures `manifest.json`, icons, and comments data ship in `dist`.
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
	// Why: Declares resolvable file extensions for import resolution.
	// Default: Includes `.js`, `.json`, and `.wasm` in webpack defaults.
	// Use Case: Keeps explicit extension policy aligned with this codebase.
	resolve: { extensions: [".js", ".json"] },

	// ==========================================
	// OPTIMIZATION POLICY
	// ==========================================
	// Why: Enables minification and shared chunk extraction for production builds.
	// Default: `mode`-dependent optimization behavior applies when omitted.
	// Use Case: Reduces bundle size while keeping source maps manageable.
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
	// Why: Keeps debugging info lightweight while preserving stack trace utility.
	// Default: Varies by webpack `mode` and may be disabled in production.
	// Use Case: Helps diagnose extension runtime errors during development/testing.
	devtool: "cheap-source-map",
};
