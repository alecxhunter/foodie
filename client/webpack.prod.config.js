const webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var combineLoaders = require('webpack-combine-loaders')

var config = {
    entry: './src/index.js',
	
    output: {
        path: __dirname + '/static',
        publicPath: '/static/',
        filename: 'bundle.js',
    },
	
    devServer: {
        inline: true,
        port: 8080
    },
	
    module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['env', 'react'/*, 'react-hmre'*/, 'stage-2']
            }
         },
         {
            test: /\.css$/,
            loader: 'style-loader'
         },
         {
             test: /\.css$/,
             loader: 'css-loader',
             query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
             }
         },
         /* {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              'style-loader',
              combineLoaders([{
                loader: 'css-loader',
                query: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }])
            )
          } */
      ]
    },
   
    plugins: [
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(false),
            API_URL: JSON.stringify('http://24.254.185.219:8085')
        })/* ,
        new ExtractTextPlugin('styles.css') */
    ]
}

module.exports = config
