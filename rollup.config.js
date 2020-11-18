import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'

rm.sync(path.resolve('dist/**/*'))

const packageName = 'vue-rlc'
const pascalCasePackageName = 'VueRlc'

const input = 'src/index.ts'
const formats = ['es', 'cjs', 'iife']

const configs = []
formats.forEach(format => {
  const config = {
    input,
    output: {
      format,
      name: pascalCasePackageName,
    },
  }

  configs.push({
    ...config,
    plugins: [
      ts({
        exclude: ['test/**/*'],
      }),
      resolve(),
      globals(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  configs.push({
    ...config,
    plugins: [
      ts({
        exclude: ['test/**/*'],
      }),
      resolve(),
      globals(),
      terser(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})

export default configs
