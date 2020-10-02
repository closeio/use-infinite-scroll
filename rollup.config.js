import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      sourcemap: true,
      file: pkg.main,
      format: 'cjs',
    },
    {
      sourcemap: true,
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
};
