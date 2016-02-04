'use strict'

import config from '../config'
import gulp from 'gulp'
import del from 'del'

let cleanTask = function () {
  return del(config.paths.dest)
}

gulp.task('clean', cleanTask)

export default cleanTask
