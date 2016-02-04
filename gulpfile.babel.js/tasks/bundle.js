'use strict'

import config from '../config'
import gulp from 'gulp'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import assign from 'object-assign'
import source from 'vinyl-source-stream'

let opts = assign({}, watchify.args, {
  entries: [config.paths.entry],
  debug: true
})
let b = watchify(browserify(opts))
let bundle = function () {
  return b.bundle()
    .on('error', function (err) {console.log('error', err)})
    .pipe(source(config.paths.outfile))
    .pipe(gulp.dest(config.paths.js_dest))
}

b.transform(babelify, {presets: ['es2015', 'react'], ignore: /node_modules/})
gulp.task('bundle', ['lint'], function () {
  return bundle()
})

export default bundle
export {b as bundler, bundle}
