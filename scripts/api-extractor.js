const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')
const packageDirs = require('./utils').packageDirs

packageDirs.forEach(packageDir => {
  childProcess.execSync(
    `yarn api-extractor run ${process.argv.slice(2).join(' ')} -c ${path.join(packageDir, 'api-extractor.json')}`,
    {
      stdio: 'inherit',
    },
  )
})
