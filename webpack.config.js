const path = require( "path" );

const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );

module.exports = {
	mode: "production", // Change to 'development' for development mode
	entry: {
		watch: "./src/watch.js",
		shorts: "./src/shorts.js",
	},
	output: {
		path: path.resolve( __dirname, "lib", "scripts" ),
		filename: "[name].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [ "@babel/preset-env" ],
					},
				},
			},
		],
	},
	optimization: {
		minimize: true, // Ensure minimization is enabled
		minimizer: [
			new ( require( "terser-webpack-plugin" ) )( {
				terserOptions: {
					format: {
						comments: false, // Remove all comments including licenses
					},
				},
				extractComments: false, // Disable license comment extraction
			} ),
		],
	},
	plugins: [ new CleanWebpackPlugin() ],
};
