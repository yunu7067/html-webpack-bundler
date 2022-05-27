const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    index: './src/index.js',
    main: './src/js/main.js',
    test: './src/js/test.js',
  },
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, 'out'),
    clean: true,
    assetModuleFilename: 'static/js/[name].[hash][ext][query]',
    chunkFilename: '[id].js',
    chunkFormat: 'array-push',
  },
  module: {
    rules: [
      {
        /* JavaScript, React */
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        /* CSS, SASS, SCSS */
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        /* HTML */
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        /* Assets */
        test: /\.(png|svg|jpg|jpeg|jpe|gif|webp|avif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/img/[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html',
      chunks: ['index', 'main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: './src/templates/test.html',
      chunks: ['index', 'test'],
    }),
    new MiniCssExtractPlugin({
      filename: `static/[name].css`,
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 23132,
    open: true,
  },
  optimization: {
    /* Tree Shaking */
    usedExports: true,
    /* Chunk */
    splitChunks: {
      chunks: 'all',
    },
  },
};
