const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '',
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
    },

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                        }
                    }, "css-loader"
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/commons.[chunkhash:8].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
    ],
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