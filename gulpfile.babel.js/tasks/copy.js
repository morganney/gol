'use strict'

import config from '../config'
import gulp from 'gulp'

function copyTask () {
  return gulp.src(config.paths.bootstrap_src).pipe(gulp.dest(config.paths.bootstrap_dest))
}

gulp.task('copy', copyTask)

export default copyTask
