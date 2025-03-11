const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, '_bundles'),
        library: 'StudioSDK',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: ['ts-loader'],
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
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
}; 