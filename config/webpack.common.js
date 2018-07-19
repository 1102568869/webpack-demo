const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        app: './src/index.js',
        // another: './src/another-module.js',
    },
    externals: {
        // jquery: 'window.jQuery',
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
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]',
                        options: {
                            publicPath: './images'
                        }
                    }
                ],

            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // hash: true,
            inject: 'head',
            template: './src/index.html',
            title: '不,你不想!',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[hash:8].css",
            chunkFilename: "css/commons.[hash:8].css"
        }),
    ],
};