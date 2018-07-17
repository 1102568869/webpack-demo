const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        another: './src/another-module.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
    ],
};