const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: {
    areaChart: './src/area-chart.jsx',
    barChartD3: './src/bar-chart.js',
    barChart: './src/bar-chart-react.jsx',
    lineChart: './src/line-chart.jsx',
    pieChart: './src/pie-chart.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['browser', 'module', 'main'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/templates/bar-chart-react.html',
      filename: './index.html',
      chunks: ['barChart'],
    }),
    new HtmlWebPackPlugin({
      template: './src/templates/bar-chart.html',
      filename: './bar-chart.html',
      chunks: ['barChartD3'],
    }),
    new HtmlWebPackPlugin({
      template: './src/templates/line-chart.html',
      filename: './line-chart.html',
      chunks: ['lineChart'],
    }),
    new HtmlWebPackPlugin({
      template: './src/templates/area-chart.html',
      filename: './area-chart.html',
      chunks: ['areaChart'],
    }),
    new HtmlWebPackPlugin({
      template: './src/templates/pie-chart.html',
      filename: './pie-chart.html',
      chunks: ['pieChart'],
    }),
    new webpack.HotModuleReplacementPlugin({}),


  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 3000,
    hot: true,
  },
};
