import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
        },
        emptyOutDir: true,
        minify: true,
        sourcemap: false,
        outDir: 'dist',
    },
    plugins: [
        dts({
            include: ['src/**/*.ts', '../connector-types/src/**/*.ts'],
            outDir: 'dist',
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
    resolve: {
        alias: {
            '@chili-studio/connector-types': resolve(__dirname, '../connector-types/src'),
        },
    },
});
