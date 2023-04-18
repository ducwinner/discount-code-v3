const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const mode = process.env.MODE === "development" ? "development" : "production";

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: 'bss-b2b.js',
    path: path.resolve(__dirname, 'dist'),
  },
};