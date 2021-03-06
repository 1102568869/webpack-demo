const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: '../dist',
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
});