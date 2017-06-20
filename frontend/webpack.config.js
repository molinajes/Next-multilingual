var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "src");
var OUTPUT = path.resolve(__dirname, "../app/themes/react/js/react");
// var OUTPUT = path.resolve(__dirname, "../../EmptyNodeServer");

var bourbon = require('bourbon-neat').includePaths;
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const precss = require('precss');
const autoprefixer = require('autoprefixer');

var config = {
	entry: [
		// 'react-hot-loader/patch',
		// 'webpack-dev-server/client?http://' + '0.0.0.0' + ':3000',
		// 'webpack/hot/only-dev-server',
		__dirname + '/src/index.js'
	],
	output: {
		path: OUTPUT,
		filename: "react-index.js",
		sourceMapFilename: "react-index.js.map",
		// publicPath: 'http://localhost:3000/build/',
		publicPath: '/app/themes/react/js/react/',
	},
	module: {
        rules: [		
			{
				test: /\.jsx?$/,
				include: DEV,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					// cacheDirectory: true,
					plugins: ['transform-decorators-legacy', 'glamorous-displayname' ],
					presets: ['es2015', 'stage-2', 'react']
				}	
			},
			{
				test: /\.scss$/,
				use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')
                        ]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            bourbon
                        ]
                    }
                }]
			},
			{
				test: /\.css$/,
				use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')
                        ]
                    }
                }]
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: [{
                    loader: 'file-loader',
					query: {
						name: 'static/media/[name].[hash:8].[ext]'
					}
                }]
			},
			{
                include: DEV,
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader'
                }],

                enforce: 'pre'
            },
		]
    },
	devtool: 'eval',
	// devtool: 'cheap-module-source-map',
	// devtool: 'cheap-module-eval-source-map',
	resolve: {
		// extensions: ['','.js']
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
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			ENV_PRODUCTION: JSON.stringify(true),
			LOGGING_ENABLED: JSON.stringify(true),
			IS_EXTERNAL_RELEASE: JSON.stringify(false)
		})
		// new BundleAnalyzerPlugin()
	],
    /*postcss: function () {
		return [autoprefixer, precss];
	}*//*,
	sassLoader: {
		includePaths: [path.resolve(__dirname, "./some-folder")]
	}*/
};
 
module.exports = config;