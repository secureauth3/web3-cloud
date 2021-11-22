import babel from 'rollup-plugin-babel';
import commonjs from "rollup-plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import json from "@rollup/plugin-json";

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        // sourcemap: true,
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
        // sourcemap: true,
      }
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
        }),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      commonjs({ 
        include: ["./index.js", "node_modules/**"] 
        }),
      json(),
      external(),
      terser(),
    ]
  }
];