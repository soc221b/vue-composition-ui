const fs = require('fs')
const path = require('path')

exports.packageDirInfos = fs
  .readdirSync(path.join(__dirname, '..', 'packages'))
  .map(basename => [basename, path.join(__dirname, '..', 'packages', basename)])
  .filter(([basename]) => basename !== 'shared')
  .filter(([_, absPath]) => fs.lstatSync(absPath).isDirectory())
