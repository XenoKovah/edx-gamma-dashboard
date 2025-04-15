const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (_, argv) => {
  const isDevelopment = argv.mode === 'development';

  const envConfig = dotenv.config({ path: '.env.development' }).parsed || {};

  const envKeys = Object.keys(envConfig).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(envConfig[key]);
    return acc;
  }, {});

  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      assetModuleFilename: (pathData) => {
        const filepath = pathData.filename.split('.').slice(0, -1).join('.');
        return `assets/${pathData.module.resourceResolveData.type || 'images'}/${filepath}[ext]`;
      },
    },
    devtool: isDevelopment ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset/resource',
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        ...envKeys,
      }),
    ],
  };
};
