'use strict'

import config from '../../config'
import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

function buildJavaScript () {
  let bundler = browserify({
    entries: [config.paths.entry],
    debug: true
  })

  bundler.transform(babelify, {presets: ['es2015', 'react'], ignore: /node_modules/})

  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source(config.paths.buildfile))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true, debug: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.js_dest))
}

gulp.task('javascript', ['lint'], buildJavaScript)

export default buildJavaScript
