const { resolve } = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: resolve( __dirname, 'dist' ),
		filename: 'js/[name].[contentHash].js'
	},
	resolve: {
		extensions: ['.js', '.css']    
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				enforce: "pre",
				use: [
					{
						loader: 'import-glob-loader'
					},          
				],
			},  
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			}						
		]
	},
	plugins: [       
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
		    	removeScriptTypeAttributes: true
		  	}	
		})
	]
};
