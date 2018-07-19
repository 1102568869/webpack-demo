const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        // publicPath: '',
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
    },


    optimization: {
        minimizer: [
            new CleanWebpackPlugin(['../dist'], {
                allowExternal: true
            }),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: "all",
            minSize: 0,
            minChunks: 2,
            cacheGroups: {
                common: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {//cacheGroups重写继承配置，设为false不继承
                    name: 'common',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

});