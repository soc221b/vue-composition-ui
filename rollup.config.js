import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import vue from 'rollup-plugin-vue'

rm.sync(path.resolve('dist/**/*'))

const packageName = 'vue-rlc'
const pascalCasePackageName = 'VueRlc'

const input = 'src/index.ts'
const formats = ['es', 'cjs', 'iife']

const configs = []
formats.forEach(format => {
  const config = {
    input,
    external: ['vue'],
    output: {
      globals: {
        vue: 'Vue',
      },
      format,
      name: pascalCasePackageName,
    },
  }

  configs.push({
    ...config,
    plugins: [vue(), ts(), resolve(), globals()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  configs.push({
    ...config,
    plugins: [vue(), ts(), resolve(), globals(), terser()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})

export default configs
