const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, '_bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'editor-sdk',
        umdNamedDefine: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: ['awesome-typescript-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                include: /\.min\.js$/,
            }),
        ],
    },
    devtool: 'source-map',
};
