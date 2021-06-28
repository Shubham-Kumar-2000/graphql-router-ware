import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const commonConfig = {
    input: 'src/index.js',
    output: {
        name: 'index',
        sourcemap: true,
    },
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules',
            },
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
        }),
        commonjs(),
    ],
};

// ESM config
const esmConfig = { ...commonConfig };
esmConfig.output = {
    ...commonConfig.output,
    file: 'dist/mjs/index.mjs',
    format: 'esm',
};

// ESM prod config
const esmProdConfig = { ...esmConfig };
esmProdConfig.output = {
    ...esmConfig.output,
    file: 'dist/mjs/index.min.mjs',
    sourcemap: false,
};
esmProdConfig.plugins = [...esmConfig.plugins, terser()];

// UMD config
const umdConfig = { ...commonConfig };
umdConfig.output = {
    ...commonConfig.output,
    file: 'dist/umd/index.js',
    format: 'umd',
};
umdConfig.plugins = [...commonConfig.plugins];

// Production config
const umdProdConfig = { ...umdConfig };
umdProdConfig.output = {
    ...umdConfig.output,
    file: 'dist/umd/index.min.js',
    sourcemap: false,
};
umdProdConfig.plugins = [...umdConfig.plugins, terser()];

const configurations = [];

configurations.push(esmConfig, esmProdConfig, umdConfig, umdProdConfig);
export default configurations;
