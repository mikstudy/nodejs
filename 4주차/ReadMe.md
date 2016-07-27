4주차 스터디
=====

## 1. 빌드 시스템: gulp.js
 - 빌드 시스템은 반복적인 작업을 자동화 해주는 도구. (grunt, gulp 등등)
 - gulp는 task 단위로 작성 함. 반대로 grunt는 대부분의 작업을 설정을 통해 실행.
 - 일반적으로 js, css등을 컴파일하여(minify 또는 uglify) 특정 폴더로 복사하거나, shell 명령어를 호출하는 등
   여러가지 작업을 수행 할 수 있음.
 - 공식 홈페이지: http://gulpjs.com/
 ```bash
 $ npm install gulp
 ``` 
 <br>
 
  #### A. gulp task 작성

 ```js
 const gulp = require('gulp');
 
 gulp.task('task name', () => {
 	console.log('hello gulp!');
 });
 ```
 
 #### B. 기본 task 정의
 ```js
 gulp.task('default', [
	'task 1',
	'task 2',
	'task 3'
 ]);  
 ```
 ```bash
  gulp	// 'default' task를 호출
 ```
 
<br>
## 2. gulp 플러그인
 - gulp는 task 기반이고, task들을 이어주는 pipe 인터페이스를 제공함.
 - gulp는 task를 쉽게 작성 할 수 있는 여러 플러그인들을 제공함. (플러그인 인터페이스를 통해 나만의 플러그인도 개발 가능)
 <br>
 #### A. uglify
 ```bash
 $ npm install gulp-uglify 
 ```
 ```js
 const gulp = require('gulp');
 const uglify = require('gulp-uglify');

 gulp.task('min-lib', () => {
 	return gulp.src('lib/jquery-3.1.0.js')
    	.pipe(uglify())
     	.pipe(gulp.dest('./www/lib'));
 });

 gulp.task('default', ['min-lib']);
 ```
 
 #### B. concat
 ```bash
 npm install gulp-concat
 ```
 ```js
 const gulp = require('gulp');
 const uglify = require('gulp-uglify');
 const concat = require('gulp-concat');

 gulp.task('min-js', () => {
 	return gulp.src('./js/**.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./www/js'));
 });
 ```
 
 #### C. watch
 ```js
 gulp.task('watch', () => {
 	gulp.watch('./js/**.js', ['min-js']);
 });
 ```
 ```bash
 $ gulp watch
 ```
 
 #### D. notify
 ```bash
 $ npm install gulp-notify
 ``` 
 ```js
 const notify = require('gulp-notify');
 
 gulp.task('min-js', () => {
      return gulp.src('./js/**.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./www/js'))
		.pipe(notify('Built: js'));	// notify
 });
 ```
 
 #### E. run-sequence
 ```bash
 $ npm install run-sequence
 ```
 ```js
 const runSequence = require('run-sequence');
 
 gulp.task('default', runSequence('min-lib', 'min-js'));
 ``` 
 
 
 
 
 
 
 
 
 
 
