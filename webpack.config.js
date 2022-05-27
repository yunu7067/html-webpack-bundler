const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {glob} = require('glob');

const getTemplates = () => glob.sync('./src/templates/**.html').map(file => file.match(/\/templates\/(.+)\.html$/)[1]);

const getEntries = () => {
  const entries = {common: './src/index.js'};
  getTemplates().forEach(templateName => {
    entries[templateName] = `./src/js/${templateName}.js`;
  });
  return entries;
};

const getHtmlWebpackPlugins = () => {
  return getTemplates().map(
    templateName =>
      new HtmlWebpackPlugin({
        filename: `${templateName}.html`,
        template: `./src/templates/${templateName}.html`,
        chunks: ['common', templateName],
      }),
  );
};

// console.log(getHtmlWebpackPlugins());

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: getEntries(),
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
    ...getHtmlWebpackPlugins(),
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
