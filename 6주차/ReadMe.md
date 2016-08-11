6주차 스터디
=====

## 1. Async.js: 비동기 흐름 제어
- 중첩된 콜백 함수 회피(콜백헬 회피)
-- 콜백헬 이란?
```js
var fs = require('fs');
fs.readFile("TextFile1.txt", function(error, data1) {
	fs.readFile("TextFile2.txt", function(error, data2) {
    	fs.readFile("TextFile3.txt", function(error, data3){ 
        });
    });
});
```
- Async: https://github.com/caolan/async

  #### A. series: 연속 실행
  - 정의된 task를 순차적으로 실행
  - [tasks] 결과값이 [callback] 순차적으로 전달
  - err 발생하면 task를 중단하고 [callback] 호출
  ```js
  series([tasks], [callback]);
  ```

  #### B. waterfall: 연속 실행(결과 전달)
  - 정의된 task를 순차적으로 실행
  - [tasks] 결과값을 다음 [tasks] 전달
  - err 발생하면 task를 중단하고 [callback] 호출
  ```js
  waterfall([tasks], [callback]);
  ```

  #### C. parallel: 병렬 실행
  - 정의된 task를 별렬적으로 실행
  - [tasks] 도중 에러가 발생하면 바로 [callback] 함수 호출
  - err 발생하면 [callback] 호출(에러가 발생하지 않는 tasks들은 끝까지 동작)
  ```js
  parallel([tasks], [callback]);
  ```

  #### D. queue: 큐
  - queue 작업을 받아서 처리하는 tasks 함수 정의
  - 최대 동작가능한 개수 설정 가능
  ```js
  queue([tasks], [최대 동시 작업수]);
  ```

  #### E. forEach
  - 순회
  ```js
  forEach([collection], [tasks], [callback]);
  ```

  #### F. map
  - forEach 와는 다르게 [callback] 에서 결과를 받을 수 있음
  ```js
  map([collection], [tasks], [callback]);
  ```

  #### G. detect: 감지
  - 순회 도중 중단해야 할 때 사용
  ```js
  detect([collection], [tasks], [callback]);
  ```