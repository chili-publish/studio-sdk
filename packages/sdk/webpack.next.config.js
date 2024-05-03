const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => ({
    entry: path.resolve(__dirname, 'src', 'next', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'next'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'NextStudioSDK',
        umdNamedDefine: true,
        globalObject: 'this',
    },
    mode: env.env || 'development',
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
