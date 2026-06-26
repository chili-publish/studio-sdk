import { resolve } from 'path';
import { defineConfig, loadEnv, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

const sdkSrcDir = resolve(__dirname, 'src');
const connectorTypesSrcDir = resolve(__dirname, '../connector-types/src');

const BUILD_SOURCE_EXCLUDE = [
    '**/setupTests.ts',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/__tests__/**',
    '**/__mocks__/**',
] as const;

function createPreserveModulesBuild({
    srcDir,
    outDir,
    define,
}: {
    srcDir: string;
    outDir: string;
    define: Record<string, string>;
}): UserConfig {
    return {
        define,
        resolve: {
            alias: {
                '@chili-studio/connector-types': connectorTypesSrcDir,
            },
        },
        build: {
            sourcemap: true,
            minify: false,
            emptyOutDir: false,
            lib: {
                entry: resolve(srcDir, 'index.ts'),
                formats: ['es', 'cjs'],
            },
            rollupOptions: {
                external: ['penpal'],
                output: {
                    preserveModules: true,
                    preserveModulesRoot: srcDir,
                    entryFileNames: '[name].[format].js',
                    exports: 'named',
                },
            },
            outDir,
        },
    };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const engineDomain = env.ENGINE_DOMAIN || 'studio-cdn.chiligrafx.com';
    const buildTarget = process.env.SDK_BUILD_TARGET || 'bundle';

    console.info(`Engine domain: ${engineDomain}`);
    console.info(`SDK build target: ${buildTarget}`);

    const define = {
        __ENGINE_DOMAIN__: JSON.stringify(engineDomain),
    };

    if (buildTarget === 'lib') {
        return createPreserveModulesBuild({
            srcDir: sdkSrcDir,
            outDir: 'lib/src',
            define,
        });
    }

    return {
        plugins: [
            dts({
                include: ['src/**/*', '../connector-types/src/**/*'],
                outDir: 'lib',
                rollupTypes: false,
                exclude: [...BUILD_SOURCE_EXCLUDE],
            }),
        ],
        define,
        resolve: {
            alias: {
                '@chili-studio/connector-types': connectorTypesSrcDir,
            },
        },
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'StudioSDK',
                formats: ['umd'],
                fileName: () => 'main.js',
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
    };
});
