const webpack = require('webpack');
const path = require('path');

module.exports = {
	//entry: './src/app.js',
	entry: {
		app: __dirname + '/src/index.js'
	},
	output: {
		// gulp 로 빌드할 경우는 아래 path는 주석, webpack으로 빌드할 경우 주석해제
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},
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
            },
			{ 
				test: /\.md$/, 
				use: [
					{
						loader: 'html-loader' 
					},
					{
						loader: 'markdown-loader',
						options: {
                            /* your options here */
                        }
					}
				]
			},
			{ 
				test: /\.json$/, 
				use: [{
					loader: 'json-loader' 
				}]
			}
        ]
	}
}