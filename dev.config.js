const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { plugins } = require('./webpack.config.js');
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
            "DB_URL": JSON.stringify("murolinks.sqlite3")
        })
    ]
});


