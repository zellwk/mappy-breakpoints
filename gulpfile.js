import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'

const sass = gulpSass(dartSass)

export function css () {
  return gulp
    .src('*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
}

export const watch = function () {
  gulp.watch('*.scss', { ignoreInitial: false }, css)
}
