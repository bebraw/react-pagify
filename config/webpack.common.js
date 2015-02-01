'use strict';


module.exports = {
    entry: [
        './demo/index'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.md', '.css'],
    },
};

module.exports.loaders = [
    {
        test: /\.css$/,
        loaders: ['style', 'css'],
    },
    {
        test: /\.json$/,
        loaders: ['json'],
    },
    {
        test: /\.md$/,
        loader: 'html!../loaders/markdown',
    },
];
