const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { plugins } = require('./webpack.config.js');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            "DB_URL": "https://archive.org/download/murolinks/murolinks.sqlite3"
        })
    ]
});