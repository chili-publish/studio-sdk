import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const engineDomain = env.ENGINE_DOMAIN || 'studio-cdn.chiligrafx.com';

    console.info(`Engine domain: ${engineDomain}`);

    return {
        plugins: [
            dts({
                include: ['src/**/*', '../connector-types/src/**/*'],
                outDir: 'lib',
                rollupTypes: false,
                exclude: [
                    'src/setupTests.ts',
                    '**/*.test.ts',
                    '**/*.test.tsx',
                    '**/*.spec.ts',
                    '**/*.spec.tsx',
                    '**/__tests__/**',
                    '**/__mocks__/**',
                ],
            }),
        ],
        define: {
            __ENGINE_DOMAIN__: JSON.stringify(engineDomain),
        },
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'StudioSDK',
                formats: ['es', 'umd'],
                fileName: (format) => (format === 'es' ? 'main.es.js' : 'main.js'),
            },
            rollupOptions: {
                output: {
                    exports: 'named',
                    extend: true,
                },
            },
            sourcemap: true,
            minify: true,
            outDir: '_bundles',
            emptyOutDir: true,
        },
        resolve: {
            alias: {
                '@chili-studio/connector-types': resolve(__dirname, '../connector-types/src'),
            },
        },
    };
});
