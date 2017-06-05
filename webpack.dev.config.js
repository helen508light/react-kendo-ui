const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		'react-puf': './react-puf.js',
        'app.bundle': './demo/src/index.js'
	},
	output: {
        filename: '[name].js',
		path: path.resolve(__dirname, 'demo', 'build'),
        publicPath: '/demo/build',
		library: 'Puf',
		libraryTarget: 'umd'
	},
	module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }]
            }
        ]
    },

    devServer: {
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/',
    }
};
