'use strict';


module.exports = {
    entry: [
        './demo/index'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.md', '.css'],
    },
};

module.exports.loaders = [
    {
        test: /\.css$/,
        loaders: ['style', 'css'],
    },
    {
        test: /\.md$/,
        loader: 'html!../loaders/markdown',
    },
];
