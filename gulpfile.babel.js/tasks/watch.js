'use strict'

import config from '../config'
import {bundler, bundle} from './bundle'
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import merge from 'merge-stream'

let watchTask = function (done) {
  let less = gulp.watch(config.paths.less, ['less'])
  let update = function () {
    let lintStream = gulp.src(config.paths.js)
      .pipe(eslint())
      .pipe(eslint.format())
    let bundleStream = bundle()

    return merge(lintStream, bundleStream)
  }

  bundler.on('update', update).on('log', function (msg) {
    console.log(`bundle updated: ${msg}`)
  })
  less.on('change', function (event) {
    console.log(`file ${event.path} has ${event.type}`)
  })

  return done()
}

gulp.task('watch', ['bundle', 'less', 'copy'], watchTask)

export default watchTask
