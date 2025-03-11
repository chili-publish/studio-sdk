const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = (env) => merge(commonConfig, {
    output: {
        filename: '[name].node.js',
        libraryTarget: 'commonjs2',
    },
    target: 'node',
    mode: env.env || 'development',
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
        },
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                },
            }),
        ],
    },
    devtool: 'source-map',
}); 