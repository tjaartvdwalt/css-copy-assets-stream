var cssStream = require('..')
var fs = require('fs')
var path = require('path')

var inputFile = path.join(__dirname, 'sample.css')

fs.createReadStream(inputFile)
  .pipe(cssStream(inputFile, {output: 'output'}))
  .pipe(process.stdout)
