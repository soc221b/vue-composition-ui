import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import vue from 'rollup-plugin-vue'
import replace from '@rollup/plugin-replace'

rm.sync(path.resolve('dist/**/*'))

const pascalCasePackageName = 'VueCompositionUi'

const input = 'src/index.ts'

const configs = [
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'iife',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.global.js`),
    },
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: true })],
  },
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'iife',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.global.prod.js`),
    },
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: false }), terser()],
  },
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'cjs',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.cjs.js`),
    },
    external: ['vue'],
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: true })],
  },
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'cjs',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.cjs.prod.js`),
    },
    external: ['vue'],
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: false }), terser()],
  },
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'es',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.esm-browser.js`),
    },
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: true })],
  },
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'es',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.esm-browser.prod.js`),
    },
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: false }), terser()],
  },
  {
    input,
    output: {
      globals: {
        vue: 'Vue',
      },
      format: 'es',
      name: pascalCasePackageName,
      file: path.resolve(`dist/index.esm-bundler.js`),
    },
    external: ['vue'],
    plugins: [vue(), ts(), resolve(), globals(), replace({ __DEV__: `(process.env.NODE_ENV !== 'production')` })],
  },
]

export default configs
