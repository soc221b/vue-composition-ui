const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

const packageDirs = fs
  .readdirSync(path.join(__dirname, '..', 'packages'))
  .map(relPath => path.join(__dirname, '..', 'packages', relPath))
  .filter(absPath => fs.lstatSync(absPath).isDirectory())

packageDirs.forEach(packageDir => {
  childProcess.execSync(
    `yarn api-extractor run ${process.argv.slice(2).join(' ')} -c ${path.join(packageDir, 'api-extractor.json')}`,
    {
      stdio: 'inherit',
    },
  )
})
