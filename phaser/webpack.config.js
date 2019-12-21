const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// PATHS
const MAIN_DIR = path.resolve(__dirname, '');
const IMAGE_DIR = path.resolve(__dirname, 'assets/images');
const BUILD_PATH = path.resolve(__dirname, 'dist/build');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'src/main.js')],
        vendor: ['phaser'], // maybe 'webfontloader'
    },
    mode: 'development',
    output: {
        pathinfo: true,
        path: BUILD_PATH,
        publicPath: './build',
        filename: 'bundle.js',
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }),
        new HtmlWebpackPlugin({
            hash: true,
            // minify: {
            //     collapseWhitespace: true,
            //     preserveLineBreaks: false,
            // },
            title: 'Gotinha',
            favicon: `${IMAGE_DIR}/favicon.ico`,
            template: `${MAIN_DIR}/index.html`,
            filename: `${DIST_PATH}/index.html`,
            publicPath: './build',
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./dist'],
            },
        }),
        new CopyWebpackPlugin([
            {
                from: 'assets',
                to: '../assets',
            },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src'),
            },
        ],
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all',
        },
    },
};
