const axios = require('axios');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const readEngineJSON = () => {
    const filePath = path.resolve(__dirname, 'editor-engine.json');
    return fs.readFileSync(filePath, 'utf8');
};

const cacheDir = path.resolve(__dirname, '.cache');

const isFileCached = (filePath) => {
    try {
        const stats = fs.statSync(filePath);
        return stats.isFile();
    } catch (err) {
        return false;
    }
};

const downloadFile = async (url) => {
    // dest is the hash of the url
    const dest = url.replace(/[^a-z0-9]/gi, '_').toLowerCase();    
    const cachePath = path.resolve(cacheDir, dest);
    if (isFileCached(cachePath)) {
        console.log(`Using cached file: ${cachePath}`);
        // return content as string
        return fs.readFileSync(cachePath, 'utf8');
    }
    try {
        console.log(`Downloading file: ${url}`);
        const response = await axios.get(url);
        const buffer = await response.data;
        // store in cache
        fs.mkdirSync(cacheDir, { recursive: true });
        fs.writeFileSync(cachePath, buffer);   
        return buffer;
    } catch (err) {
        console.error(`Error downloading file: ${url}`);
        console.error(err);
    }
};

module.exports = async (env) => {

    var engine = JSON.parse(await readEngineJSON());
    var engine_version = engine.current;
    var baseUrl = 'https://stgrafxstudiodevpublic.blob.core.windows.net/editor/<VERSION>/web/';
    var url = baseUrl.replace('<VERSION>', engine_version);
    
    return ({
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, '_bundles'),
            filename: '[name].js',
            libraryTarget: 'umd',
            library: 'ChiliEditorSDK',
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
                PENPAL_JS: JSON.stringify(await downloadFile('https://unpkg.com/penpal@6.1.0/dist/penpal.min.js')),
                INIT_JS: JSON.stringify(await downloadFile(url + 'init.js')),
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
};
