var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpackDevServer2.config.js');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	filename: 'react-index.js',
	hot: true,
	historyApiFallback: true,
	proxy: {
		// "*": "http://localhost:8080"
		"**": {
			target: {
				"host": "dev.reqfire",
				"protocol": 'http:',
				"port": 80
			},
			changeOrigin: true,
			cookieDomainRewrite: "http://dev.reqfire"
		}
	}
	
}).listen(3000, 'localhost', function (err, result)
{
	if (err)
		console.log(err);

	console.log('Listening at localhost:3000');
});