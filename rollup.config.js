import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
// import { terser } from "rollup-plugin-terser";
import autoNamedExports from 'rollup-plugin-auto-named-exports';
import css from 'rollup-plugin-css-only'

import pkg from './package.json';

export default {
  external: ['react'],
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    // terser(), // minifies generated bundles
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        // no need manual custom
      }
    }),
    autoNamedExports(),
    css({ output: 'bundle.css' })
  ],
};
