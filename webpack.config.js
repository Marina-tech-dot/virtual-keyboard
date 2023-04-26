const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlagin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;
  const stylesHandler = isProd ? MiniCssExtractPlagin.loader : 'style-loader';

  const plugins = () => {
    const basePlugins = [
      new HtmlWebpackPlugin({
        template: './src/index.html', // возьмет наш html и вставит в него скрипты и перенесет в папку dist

      }),
      new MiniCssExtractPlagin({
        filename: '[contenthash].bundle.css', // из output .css!
      })];

    if (isDev) {
      basePlugins.push(new ESLintPlugin());
      basePlugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return basePlugins;
  };

  return {
    entry: './src/js/script.js',
    output: {
      filename: isProd ? 'bundle.[chunkhash].min.js' : 'bundle.[chunkhash].js',
      // filename: 'bundle.[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]', // в эту папку будут сохраняться assets
      clean: true, // очищать ранее написанное
    },
    resolve: { // при импорте js файлов упростит
      extensions: ['.js', '.json', '.css', '.scss', '.html'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        images: path.resolve(__dirname, 'src/assets/img'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            stylesHandler,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|mp3|ogg|wav)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: plugins(),
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 3001,
      hot: isDev,
    },
    // add
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({ parallel: true }),
      ],
    },
  };
}
