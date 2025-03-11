const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports =(env) => ( {
    entry: './dist/esm/src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/browser'),
      filename: 'main.js',
      library: 'StudioSDK',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    mode: env.env || 'development',
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
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    module: {
        
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
