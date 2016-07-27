const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const runSequence = require('run-sequence');

gulp.task('min-lib', () => {
  return gulp.src('lib/jquery-3.1.0.js')
    .pipe(uglify())
    .pipe(gulp.dest('./www/lib'))
    .pipe(notify('Built: lib'));
});


gulp.task('min-js', () => {
  return gulp.src('./js/**.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js'))
    .pipe(notify('Built: js'));
});


gulp.task('watch', () => {
  gulp.watch('./js/**.js', ['min-js']);
});


gulp.task('default', runSequence('min-lib', 'min-js'));
