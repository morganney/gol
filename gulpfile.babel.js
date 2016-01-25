'use strict'

import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import merge from 'merge-stream'
import assign from 'object-assign'
import del from 'del'

let paths = {
  entry: 'index.js',
  outfile: 'app.js',
  dest: 'dist',
  bootstrap_dest: 'dist/css/bootstrap',
  css_dest: 'dist/css',
  js_dest: 'dist/js',
  js: 'src/**/*.js'
}
let opts = assign({}, watchify.args, {
  entries: [paths.entry],
  debug: true
})
let $ = plugins()
let b = watchify(browserify(opts))
let bundle = function () {
  return b.bundle()
    .on('error', function (err) {console.log('error', err)})
    .pipe(source(paths.outfile))
    .pipe(gulp.dest(paths.js_dest))
}

b.transform(babelify, {presets: ['es2015', 'react'], ignore: /node_modules/})

gulp.task('lint', function () {
  let eslint = $.eslint

  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('clean', ['lint'], function () {
  return del(paths.dest)
})

gulp.task('copy', ['clean'], function () {
  return gulp.src('node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest(paths.bootstrap_dest))
})

gulp.task('bundle', ['clean'], function () {
  return bundle()
})

gulp.task('watch', ['bundle'], function (done) {
  function update () {
    let lintStream = gulp.src(paths.js)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
    let bundleStream = bundle()

    return merge(lintStream, bundleStream)
  }

  b.on('update', update)
  b.on('log', function (msg) {
    console.log(`bundle updated: ${msg}`)
  })

  return done()
})

gulp.task('default', ['watch', 'copy'])
