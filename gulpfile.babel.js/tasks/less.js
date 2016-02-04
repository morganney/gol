'use strict'

import config from '../config'
import gulp from 'gulp'
import less from 'gulp-less'

let lessTask = function () {
  return gulp.src(config.paths.less)
    .pipe(less())
    .pipe(gulp.dest(config.paths.css_dest))
}

gulp.task('less', lessTask)

export default lessTask
