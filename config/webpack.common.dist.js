'use strict';
var extend = require('xtend');

var common = require('./webpack.common');


module.exports = extend(common, {
    entry: './lib/index',
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        }
    },
    module: {
        loaders: common.loaders.concat([{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/,
        }])
    }
});
