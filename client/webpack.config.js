var webpack = require('webpack');

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
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['env', 'react', 'react-hmre', 'stage-2']
            }
         }
      ]
   },

   plugins: [
       new webpack.DefinePlugin({
           DEVELOPMENT: JSON.stringify(true),
           API_URL: JSON.stringify('http://localhost:8085')
       })
   ]
}

module.exports = config;
