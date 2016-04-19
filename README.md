# css-copy-assets-stream #

A [parcelify](https://www.npmjs.com/package/parcelify) transform that copies the assets defined in a css file.

# example #

```javascript
var cssStream = require('..')
var fs = require('fs')
var path = require('path')

var inputFile = path.join(__dirname, 'sample.css')

fs.createReadStream(inputFile)
  .pipe(cssStream(inputFile, {output: 'output'}))
  .pipe(process.stdout)

```
