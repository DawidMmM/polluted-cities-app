const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = merge( common, {
  	mode: 'production',
  	module: {
    	rules: [
      		{
        		test: /\.scss$/,
        		exclude: /node_modules/,
        		use: [
	          		{
	            		loader: MiniCssExtractPlugin.loader,
	            		options: {
	              			publicPath: "../"
	            		},
	          		},
	          		{
	            		loader: 'css-loader',
	          		},
	          		{
	            		loader: 'postcss-loader',
	          		},
	          		{
	            		loader:'sass-loader',
	          		},
        		],
      		},
    	],
  	},
  	plugins: [
    	new MiniCssExtractPlugin( {
      		filename: 'css/[name].[hash].css',
      		disable: false,
      		allChunks: true
    } ),
    	new CleanWebpackPlugin();
  ]
});
