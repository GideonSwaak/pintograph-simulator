const path = require('path');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './lib/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'pintograph.js',
		libraryTarget: 'module'
	},
	experiments: {
		outputModule: true
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPkgJsonPlugin({
			remove: ['devDependencies', 'scripts', 'files'],
			replace: {
				main: 'index.js',
				types: 'index.d.ts'
			}
		}),
		new CopyPlugin({
			patterns: ['*.md'],
		})
	]
}
