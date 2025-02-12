const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// import path from "path"
// import HtmlWebpackPlugin from "html-webpack-plugin"

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/battleship.html',
        }),
    ],
    devServer: {
        watchFiles: ['./src/*.html'], // path to your html files
        // other options
      },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
}
