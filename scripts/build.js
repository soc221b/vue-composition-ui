const execa = require('execa')
const path = require('path')
const fs = require('fs-extra')
const { packageDirInfos } = require('./utils')
const { Extractor } = require('@microsoft/api-extractor')

;(async () => {
  fs.rmdir(path.resolve(__dirname, '..', 'node_modules', '.cache'), { recursive: true })

  await Promise.all(
    packageDirInfos.map(async ([basename, absPath]) => {
      fs.rmdir(path.resolve(absPath, 'dist'), { recursive: true })

      await execa('rollup', ['-c', '--environment', [`TARGET:${basename}`].join(',')], { stdio: 'inherit' })

      // rollup .d.ts
      const extractorResult = Extractor.loadConfigAndInvoke(path.resolve(absPath, 'api-extractor.json'), {
        localBuild: process.argv.indexOf('-l') !== -1 || process.argv.indexOf('--local') !== -1,
        showVerboseMessages: true,
      })
      if (extractorResult.succeeded) {
        await fs.copy(
          path.resolve(__dirname, '..', 'dist', `${basename}.d.ts`),
          path.resolve(absPath, 'dist', `${basename}.d.ts`),
        )
        await fs.rmdir(path.resolve(absPath, 'dist', 'packages'), { recursive: true })
      } else {
        console.error(
          `API Extractor completed with ${extractorResult.errorCount} errors` +
            ` and ${extractorResult.warningCount} warnings`,
        )
      }
    }),
  ).catch(error => {
    console.log(error)
    process.exit(1)
  })
})()
