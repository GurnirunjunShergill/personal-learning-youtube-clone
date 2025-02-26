const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', ".tsx", ".ts",],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: 'babel-loader', 
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,  // Apply to all .css files
        use: [
          'style-loader',  // Inject CSS into the DOM
          'css-loader',    // Interpret @import and url() like import/require()
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html'
    })
]
};
