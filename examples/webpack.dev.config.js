var webpack = require('webpack');

var buildEntryPoint = function(entryPoint) {
	return [
    	'webpack-dev-server/client?http://localhost:3000',
    	'webpack/hot/only-dev-server',
    	entryPoint
  	]
}

module.exports = {
	entry: {
		app: buildEntryPoint(__dirname + '/src/index.js')
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	devServer: {
        hot: true,
        filename: '[name].bundle.js',//'bundle.js',
        publicPath: '/demo/build',
        historyApiFallback: true,
        contentBase: './build',
        proxy: {
            "**": "http://localhost:8888"
        }
    },
	plugins: [
//		new webpack.DefinePlugin({
//	    	'process.env': {
//	    		'NODE_ENV': 'development'
//	    	}
//	    }),
		//new webpack.optimize.OccurenceOrderPlugin(),
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.HotModuleReplacementPlugin()/*,
        new webpack.NoEmitOnErrorsPlugin()*/
	],
    module:{
        loaders:[
            {
                test: /\.js$/, 
				exclude: /node_modules/, 
				loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
					plugins: ['transform-object-rest-spread'],
                })]/*,
				loader: 'babel-loader',
				query: {
                    presets: ['react', 'es2015'],
                    plugins: ["transform-object-rest-spread"],
                    cacheDirectory: true
                }*/
            }
        ]
    }
};
