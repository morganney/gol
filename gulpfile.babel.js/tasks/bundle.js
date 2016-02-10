'use strict'

import config from '../config'
import bs from '../browser-sync'
import gulp from 'gulp'
import gutil from 'gulp-util'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import assign from 'object-assign'
import source from 'vinyl-source-stream'

let opts = assign({}, watchify.args, {
  entries: [config.paths.entry],
  debug: true
})
let bundler = watchify(browserify(opts))
let bundle = function () {
  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(`bundle error: ${err.message}`)
      bs.notify(`Browserify bundle error: ${err.essage}`)
      gutil.beep()
      this.emit('end')
    })
    .pipe(source(config.paths.outfile))
    .pipe(gulp.dest(config.paths.js_dest))
    .pipe(bs.stream({once: true}))
}

bundler.transform(babelify, {presets: ['es2015', 'react'], ignore: /node_modules/})
gulp.task('bundle', ['lint'], function () {
  return bundle()
})

export default bundle
export {bundler, bundle}
