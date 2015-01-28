'use strict';
var extend = require('xtend');

var common = require('./webpack.common.dist');


module.exports = extend(common, {
    output: {
        path: './dist',
        filename: 'react-pagify.js',
        libraryTarget: 'umd',
        library: 'ReactPagify',
    },
});
