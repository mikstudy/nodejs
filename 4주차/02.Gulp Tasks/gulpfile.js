const gulp = require('gulp');


gulp.task('task1', () => {
  console.log('run task1');
});

gulp.task('task2', () => {
  setTimeout(() => {
    console.log('run task2');
  }, 1000);
});

gulp.task('task3', () => {
  console.log('run task3');
});

// 기본 태스크는 task1, 2, 3을 실행하는데, 실행 순서는 보장하지 않음.
gulp.task('default', ['task1', 'task2', 'task3']);
