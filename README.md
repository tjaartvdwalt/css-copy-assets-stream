# css-copy-assets-stream #

A [parcelify](https://www.npmjs.com/package/parcelify) transform that copies the assets defined in a css file.

It parses `.css` and `.scss`, looking for local url references `url('...')`. When found, it copies the source files to a specified `output` directory of your choosing. (Ideally `output` should be where your `bundle.css` goes, then the references remain intact.)

**NOTE:**
This project was developed for my personal use-case, and is not fully fledged at this point. Pull requests are more than welcome though. 

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

# Why does `output` have such a weird default value? #
`build/style/css` is where `bundle.css` goes in my personal project. The reason it is written in stone like that is because you cannot specify transform options in `package.json`, which is where I prefer to specify my transform. [this bug](https://github.com/rotundasoftware/parcelify/issues/29) explains it. I am trying to get it reopened.

# TODO #
- Better default value for `output`
- Remove dependency on shelljs
