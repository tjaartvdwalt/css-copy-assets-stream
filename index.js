var shelljs = require('shelljs')
var through = require('through')
var path = require('path')
var parseCssUrls = require('css-url-parser')

module.exports = function (file, opts) {
  var data = ''
  var ext = path.extname(file)
  if (file !== undefined && (ext !== '.css' && ext !== '.scss')) {
    return through()
  } else {
    return through(write, end)
  }
  function write (buf) {
    data += buf
  }

  function end () {
    try {
      var output = 'build/style/css'
      if (opts && opts.output) { output = opts.output }
      var cssUrls = parseCssUrls(data)
      for (var i in cssUrls) {
        console.log(cssUrls[i])
        // If the filename has additional properties we should remove those
        var filename = cssUrls[i]
        var filenameRegex = cssUrls[i].match('(.*)\\?')
        if (filenameRegex) {
          filename = filenameRegex[1]
        }

        shelljs.mkdir('-p', path.dirname(path.join(output, filename)))
        shelljs.rm('-f', path.join(output, filename))
        shelljs.cp('-f', path.resolve(path.dirname(file), filename), path.join(output, filename))
      }
      this.queue(data)
    } catch (err) {
      this.emit('error', new Error(err))
    }
    this.queue(null)
  }
}
