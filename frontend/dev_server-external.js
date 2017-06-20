var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpackLive-external.config.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
    	"*": "http://localhost:8080"
    	// "*": {
     //        target: "http://dev.reqfire",
     //        changeOrigin: true,
     //        cookieDomainRewrite: "http://dev.reqfire"
     //    }
    },
    
}).listen(3000, 'localhost', function (err, result)
{
    if (err)
        console.log(err);

    console.log('Listening at localhost:3000');
});