'use strict'

import config from '../config'
import bs from '../browser-sync'
import {bundler, bundle} from './bundle'
import lintTask from './lint'
import gulp from 'gulp'
import gutil from 'gulp-util'
import merge from 'merge-stream'

function watchTask (done) {
  let less = gulp.watch(config.paths.less, ['less'])
  let update = function () {
    let lintStream = lintTask()
    let bundleStream = bundle()

    return merge(lintStream, bundleStream)
  }

  bundler.on('update', update).on('log', function (msg) {
    gutil.log(`bundle updated: ${msg}`)
  })
  less.on('change', function (event) {
    gutil.log(`file ${event.path} has ${event.type}`)
  })

  return done()
}

gulp.task('watch', ['bundle', 'less', 'copy'], watchTask)

export default watchTask
