module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: parseInt('10000'),
            name: 'images/[name].[ext]',
          },
        },
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    }
};
