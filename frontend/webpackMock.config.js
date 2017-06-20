var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "dev");
// var OUTPUT = path.resolve(__dirname, "../req/themes/react/js/react");
var OUTPUT = path.resolve(__dirname, "../../EmptyNodeServer");

var bourbon = require('bourbon-neat').includePaths;

var config = {
	entry: [
		'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + '0.0.0.0' + ':3000',
        'webpack/hot/only-dev-server',
        __dirname + '/dev/index.js'
    ],
	output: {
    	path: OUTPUT,
    	filename: "react-index.js",
    	publicPath: 'http://localhost:3000/build/',
    	// publicPath: 'http://dev.reqfire/req/themes/react/js/react/',
  	},
  	module: {
  		// preLoaders: [
	  	// 	{
	  	// 		include: DEV,
	  	// 		test: /\.js$/,
	  	// 		exclude: /node_modules/,
	  	// 		loader: 'eslint'
	  	// 	},
  		// ],
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
	resolve: {
		extensions: ['','.js']
	},
	devServer: {
		// contentBase: 'http://0.0.0.0:8080',
		contentBase: 'http://dev.reqfire',
		hot: true,
		inline: true,
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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