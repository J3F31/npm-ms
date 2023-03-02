const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index',
	output: {
		path: __dirname + '/dist',
		filename: 'index_bundle.js'
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Babylon ECS'
		})
	],
	experiments: {
		topLevelAwait: true
	},
	module: {
		rules: [
			{
				test: /\.(fx|glb|gltf|bin|jpg|jpeg|png)$/i,
				loader: 'file-loader',
				options: {
					context: 'src',
					name: '[path][name].[ext]',
				},
			},
		],
	},
	devServer: {
		compress: true,
		port: 3000,
		server: 'https',
		open: false
	}
}