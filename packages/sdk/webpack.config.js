const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = (env) => ({
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, '_bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'StudioSDK',
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
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new webpack.DefinePlugin({
            __ENGINE_DOMAIN__: JSON.stringify(env.ENGINE_DOMAIN || 'studio-cdn.chiligrafx.com')
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
