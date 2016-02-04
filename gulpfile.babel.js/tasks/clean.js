'use strict'

import config from '../config'
import gulp from 'gulp'
import del from 'del'

function cleanTask () {
  return del(config.paths.dest)
}

gulp.task('clean', cleanTask)

export default cleanTask
