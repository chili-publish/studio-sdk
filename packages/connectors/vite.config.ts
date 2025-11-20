import { generateDtsBundle } from 'dts-bundle-generator';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

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
        {
            name: 'dts-bundle-generator',
            closeBundle() {
                const result = generateDtsBundle([
                    {
                        filePath: resolve(__dirname, 'src/index.ts'),
                        output: {
                            inlineDeclareGlobals: true,
                            sortNodes: true,
                            exportReferencedTypes: true,
                            noBanner: true,
                            respectPreserveConstEnum: true
                        }
                    }
                ]);

                if (result.length > 0) {
                    writeFileSync(resolve(__dirname, 'dist/index.d.ts'), result[0]);
                }
            }
        }
    ],
    resolve: {
        alias: {
            '@chili-studio/connector-types': resolve(__dirname, '../connector-types/src'),
        },
    },
});
