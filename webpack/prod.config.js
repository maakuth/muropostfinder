const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
    devServer: {
        watchFiles: ['public/*', 'src/*'],
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            "DB_URL": "https://archive.org/download/murolinks/murolinks.sqlite3"
        })
    ]
});