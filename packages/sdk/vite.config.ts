import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
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
});
