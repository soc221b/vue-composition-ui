const execa = require('execa')
const path = require('path')
const rm = require('rimraf')
const fs = require('fs')
const { packageDirs, packageDirNames } = require('./utils')

;(async () => {
  if (process.env.RELEASE !== false) {
    rm.sync(path.resolve(__dirname, '..', 'node_modules', '.cache'))
  }
  packageDirs.map(packageDir => rm.sync(path.resolve(packageDir, 'dist/**/*')))

  const builds = packageDirNames.map(packageDirName => [
    'rollup',
    ['-c', '--environment', [`TARGET:${packageDirName}`].join(',')],
    { stdio: 'inherit' },
  ])

  await Promise.allSettled(builds.map(build => execa(...build)))

  // TODO: just generate relative types instead of move and delete redundant types
  packageDirNames.forEach(packageDirName => {
    fs.renameSync(
      path.resolve(
        __dirname,
        '..',
        'packages',
        packageDirName,
        'dist',
        'packages',
        packageDirName,
        'src',
        'index.d.ts',
      ),
      path.resolve(__dirname, '..', 'packages', packageDirName, 'dist', `${packageDirName}.d.ts`),
    )
  })
  packageDirs.forEach(packageDir => rm.sync(path.resolve(packageDir, 'dist', 'packages')))
})()
