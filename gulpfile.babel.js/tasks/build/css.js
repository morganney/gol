'use strict'

import config from '../../config'
import gulp from 'gulp'
import loadPlugins from 'gulp-load-plugins'

let plugins = loadPlugins()

function buildCss () {
  return gulp.src(config.paths.less)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less())
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(config.paths.css_dest))
}

gulp.task('css', buildCss)

export default buildCss
