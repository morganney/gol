'use strict'

import config from '../../config'
import gulp from 'gulp'
import runSequence from 'run-sequence'

function buildTask (cb) {
  runSequence(['javascript', 'css'], 'copy', cb)
}

gulp.task('build', ['clean'], buildTask)

export default buildTask
