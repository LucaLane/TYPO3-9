const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')
console.log(path.resolve(__dirname, "../template/dist"))

const config = {
    entry: {
        'bundle.min': [
            './js/includes.js'
        ]
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "../template/dist"),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader' ]
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/styles.min.css"),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: [autoprefixer]
            },
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}

module.exports = config;