const fs = require('fs')
const path = require('path')
const { exit } = require('process')

exports.packageDirs = fs
  .readdirSync(path.join(__dirname, '..', 'packages'))
  .map(relPath => path.join(__dirname, '..', 'packages', relPath))
  .filter(absPath => fs.lstatSync(absPath).isDirectory())

exports.packageDirNames = exports.packageDirs.map(absPath => absPath.replace(/^.*\/(.*)$/, '$1'))
