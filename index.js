var copy = require('copy')
var through = require('through')
var path = require('path')
var parseCssUrls = require('css-url-parser')

module.exports = function (file, opts) {
  var data = ''
  if (file !== undefined && path.extname(file) !== '.css') {
    return through()
  } else {
    return through(write, end)
  }
  function write (buf) {
    data += buf
  }

  function end () {
    try {
      var cssUrls = parseCssUrls(data)
      for (var i in cssUrls) {
        console.log(cssUrls)
        console.log(opts.output)
        copy(path.resolve(path.dirname(file), cssUrls[i]), opts.output, function () {
          console.log('done')
        })
        // var data = fs.readFileSync(path.resolve(path.dirname(file), cssUrls[i]), 'utf8')
        // var data = fs.readFileSync(path.resolve(path.dirname(file), cssUrls[i]))
        // console.log(data)
        // fs.writeFileSync(opts.output, data)
        // fs.writeFileSync()
        // var cssAbsPath = 

      //   shelljs.mkdir('-p', path.dirname(path.join(styleDir, cssUrls[j])))
      //   shelljs.rm('-f', path.join(styleDir, cssUrls[j]))
      //   shelljs.cp('-f', cssAbsPath, path.join(styleDir, cssUrls[j]))
      // // }
      }
    } catch (err) {
      this.emit('error', new Error(err))
    }
    this.queue(null)
  }
}

// // Static images gets copied relative to the project root
// if (verbatimImgPaths && verbatimImgPaths.length > 0) {
//   for (var k in verbatimImgPaths) {
//     var packageRelPath = path.relative(packagePath, verbatimImgPaths[k])
//     shelljs.mkdir('-p', path.dirname(path.join(buildDir, packageRelPath)))
//     shelljs.rm('-f', path.join(buildDir, packageRelPath))
//     shelljs.cp(verbatimImgPaths[k], path.join(buildDir, packageRelPath))
//   }
// }
// })
