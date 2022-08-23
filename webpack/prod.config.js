const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { plugins } = require('./webpack.config.js');
const baseConfig = require('./webpack.config.js');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            "DB_URL": JSON.stringify("https://archive.org/download/murolinks/murolinks.sqlite3")
        })
    ]
});
