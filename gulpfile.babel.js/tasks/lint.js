'use strict'

import config from '../config'
import gulp from 'gulp'
import gutil from 'gulp-util'
import eslint from 'gulp-eslint'

function handleResults (results) {
  if (results.errorCount) {
    gutil.beep()
  }
}

function lintTask (failAfterError = false) {
  let stream = gulp.src(config.paths.js)
    .pipe(eslint())
    .pipe(eslint.results(handleResults))
    .pipe(eslint.format())

  if (failAfterError) {
    stream.pipe(eslint.failAfterError())
  }

  return stream
}

gulp.task('lint', function () { lintTask() })

export default lintTask
