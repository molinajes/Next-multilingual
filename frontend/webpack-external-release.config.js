var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "src");
var OUTPUT = path.resolve(__dirname, "../app/themes/react/js/react");
// var OUTPUT = path.resolve(__dirname, "../../EmptyNodeServer");

var bourbon = require('bourbon-neat').includePaths;

var config = {
	entry: [
		// 'react-hot-loader/patch',
		// 'webpack-dev-server/client?http://' + '0.0.0.0' + ':3000',
		// 'webpack/hot/only-dev-server',
		__dirname + '/src/external-release-index.js'
	],
	output: {
		path: OUTPUT,
		filename: "react-external-release.js",
		// publicPath: 'http://localhost:3000/build/',
		publicPath: '/app/themes/react/js/react/',
	},
	module: {
		preLoaders: [
			{
				include: DEV,
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint'
			},
		],
		loaders: [
			{
				test: /\.jsx?$/,
				include: DEV,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					// cacheDirectory: true,
					plugins: ['transform-decorators-legacy' ],
					presets: ['es2015', 'stage-2', 'react']
				}	
			},
			{
				test: /\.scss$/,
				loaders: [
					'style',
					'css',
					'sass?includePaths[]=' + bourbon
					// 'postcss-loader'
				]
			},
			{
				test: /\.css$/,
				loaders: [
					'style',
					'css'
				]
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file',
				query: {
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
		]
	},
	devtool: 'eval',
	resolve: {
		extensions: ['','.js']
	},
	/*devServer: {
		// contentBase: 'http://0.0.0.0:8080',
		historyApiFallback: true,
		contentBase: 'http://dev.reqfire/app/',
		hot: true,
		inline: true,
	},*/
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			ENV_PRODUCTION: JSON.stringify(false),
			LOGGING_ENABLED: JSON.stringify(true),
			IS_EXTERNAL_RELEASE: JSON.stringify(true)
		})
	],
  //   postcss: function () {
		// return [
		// 	// require('postcss-smart-import')({  ...options  }),
		// 	// require('precss')({ /* ...options */ }),
		// 	require('autoprefixer')({ /* ...options */ })
		// ];
  // 	}
	sassLoader: {
		includePaths: [path.resolve(__dirname, "./some-folder")]
	}
};
 
module.exports = config;