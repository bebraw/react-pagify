'use strict';
var extend = require('xtend');
var webpack = require('webpack');

var common = require('./webpack.common');


module.exports = extend(common, {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './demo/index',
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/demo/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: common.loaders.concat([{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/,
        }])
    }
});
