'use strict'

import config from '../config'
import gulp from 'gulp'
import eslint from 'gulp-eslint'

let lintTask = function () {
  return gulp.src(config.paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

gulp.task('lint', lintTask)

export default lintTask
