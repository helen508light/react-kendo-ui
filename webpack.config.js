const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './react-puf.js',
	output: {
		filename: 'react-puf.js',
		path: path.resolve(__dirname, 'build'),
		library: 'Puf',
		libraryTarget: 'umd'
	},
	devtool: 'source-map',
	module: {
		rules: [
            {
                test: /\.js$/, 
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
						plugins: ['transform-object-rest-spread'],
                    	cacheDirectory: true
                    }
                }]
			}
			
        ]
	},
	plugins: [
  		new webpack.DefinePlugin({
			'process.env': {
        		NODE_ENV: JSON.stringify('production')
      		},
			PRODUCTION: JSON.stringify(true),
  			VERSION: JSON.stringify('BETA 0.5')
  		})
	]
}