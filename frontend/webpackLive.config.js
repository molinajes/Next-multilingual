var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "src");
var OUTPUT = path.resolve(__dirname, "../req/themes/react/js/react");
// var OUTPUT = path.resolve(__dirname, "../../EmptyNodeServer");

var bourbon = require('bourbon-neat').includePaths;

var config = {
	entry: [
		'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + '0.0.0.0' + ':3000',
        'webpack/hot/only-dev-server',
        __dirname + '/src/index.js'
    ],
	output: {
		path: OUTPUT,
		filename: "react-index.js",
		publicPath: 'http://localhost:3000/build/',
		// publicPath: 'http://dev.reqfire/app/themes/react/js/react/',
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
	resolve: {
		extensions: ['.js']
	},
	devServer: {
		// contentBase: 'http://0.0.0.0:8080',
		contentBase: 'http://dev.reqfire',
		hot: true,
		inline: true,
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
			ENV_PRODUCTION: JSON.stringify(false),
			LOGGING_ENABLED: JSON.stringify(true),
			IS_EXTERNAL_RELEASE: JSON.stringify(false)
        })
    ]
};
 
module.exports = config;