const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

module.exports = merge( common, {  
  	mode: 'development',
  	devtool: 'inline-source-map',
  	devServer: {
    	contentBase: '/dist',
    	compress: true,
    	stats: "errors-only",
    	open: true          
  	},
  	module: {
    	rules: [
      		{
		        test: /\.scss$/,
		        exclude: /node_modules/,        
		        use: [          
		          	{          
		            	loader: 'style-loader',            
		          	},
		          	{
		            	loader: 'css-loader',
		          	},            
		          	{
		            	loader:'sass-loader',
		          	},          
        		],      
      		},
    	],
  	},  
});
