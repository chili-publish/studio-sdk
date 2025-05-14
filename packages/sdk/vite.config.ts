import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['src/**/*'],
            outDir: 'lib',
            rollupTypes: true,
            exclude: [
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
            fileName: (format) => (format === 'es' ? 'main.es.js' : 'main.js'),
            formats: ['es', 'umd'],
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
    },
});
