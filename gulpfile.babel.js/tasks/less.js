'use strict'

import config from '../config'
import bs from '../browser-sync'
import gulp from 'gulp'
import less from 'gulp-less'

function lessTask () {
  return gulp.src(config.paths.less)
    .pipe(less())
    .pipe(gulp.dest(config.paths.css_dest))
    .pipe(bs.stream({once: true}))
}

gulp.task('less', lessTask)

export default lessTask
