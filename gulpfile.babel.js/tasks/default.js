'use strict'

import config from '../config'
import bs from '../browser-sync'
import gulp from 'gulp'

function defaultTask () {
  bs.init({
    server: { baseDir: '.'}
  })
}

gulp.task('default', ['watch'], defaultTask)

export default defaultTask
