import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeGlobals from 'rollup-plugin-node-globals'
import vue from 'rollup-plugin-vue'
import replace from '@rollup/plugin-replace'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const packageResolve = p => path.resolve(packageDir, p)
const packageJson = require(packageResolve('package.json'))
const buildOptions = packageJson.buildOptions || {}

const defaultFormats = ['esm-bundler', 'esm-browser', 'cjs', 'global']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const finalFormats = inlineFormats || buildOptions.formats || defaultFormats

const defaultModes = ['development', 'production']
const inlineModes = process.env.MODES && process.env.MODES.split(',')
const finalModes = inlineModes || buildOptions.modes || defaultModes

let hasChecked = false

const outputConfigs = {
  'esm-bundler': {
    format: 'es',
    file: packageResolve(`dist/${name}.esm-bundler.js`),
  },
  'esm-browser': {
    format: 'es',
    file: packageResolve(`dist/${name}.esm-browser.js`),
  },
  cjs: {
    format: 'cjs',
    file: packageResolve(`dist/${name}.cjs.js`),
  },
  global: {
    format: 'iife',
    file: packageResolve(`dist/${name}.global.js`),
  },
}

function createConfig({ format, mode, outputConfig }) {
  const isBundler = /bundler/.test(format)
  const isGlobal = /global/.test(format)
  const isDev = mode === 'development' || isBundler

  const finalConfig = {
    input: packageResolve('src/index.ts'),
    external: isBundler ? ['vue'] : [],
    output: {
      ...outputConfig,
      globals: {
        vue: 'Vue',
      },
      name: isGlobal ? 'VueCompositionUi' + name.charAt(0).toLocaleUpperCase() + name.slice(1) : undefined,
      file: isDev ? outputConfig.file : outputConfig.file.replace(/\.js$/, '.prod.js'),
    },
    plugins: [
      vue(),
      ts({
        checked: hasChecked === false,
      }),
      nodeResolve(),
      nodeGlobals(),
      replace({ __DEV__: isBundler ? `(process.env.NODE_ENV !== 'production')` : isDev }),
      isDev ? undefined : terser(),
    ],
  }

  hasChecked = true

  return finalConfig
}

const configs = finalFormats
  .map(format =>
    finalModes.map(mode =>
      createConfig({
        format,
        mode,
        outputConfig: outputConfigs[format],
      }),
    ),
  )
  .flat()

export default configs
