const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (env) => merge(commonConfig, {
    output: {
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
    },
    target: 'web',
    mode: env.env || 'development',
    resolve: {
        fallback: {
            '@grpc/grpc-js': false,
            '@grpc/proto-loader': false,
        }
    },
    externals: {
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
        '@grpc/grpc-js': {
            commonjs: '@grpc/grpc-js',
            commonjs2: '@grpc/grpc-js',
            amd: '@grpc/grpc-js',
            root: '@grpc/grpc-js',
        },
        '@grpc/proto-loader': {
            commonjs: '@grpc/proto-loader',
            commonjs2: '@grpc/proto-loader',
            amd: '@grpc/proto-loader',
            root: '@grpc/proto-loader',
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
});
