RDBMS 장/단점|NOSQL 장/단점
------------|------------
장점--------------|장점--------------
범용적,고성능,안정적|데이터 분산에 용이
설계시 불필요한 중복을 방지|복제 및 장애대응(Recovery)에 용이
복잡한 형태의 쿼리가 가능하여 원하는 데이터를 얼마든지 볼수 있다|데이터를 고속으로 처리할 필요가 있을 경우 사용
단점--------------|단점--------------
대량의 데이터 입력 처리|보안 취약
테이블 인덱스 생성,스키마 변경 시 성능 저하|데이터 모델링의 어려움

In Memory DB -Redis-
====

## 1. In Memory DataBase(IMDB)?
데이터의 스토리지의 메모리에 설치하여 처리 데이터 I/O에 소요되는 시간이 없어 하드디스크 기반의 DBMS보다 최대 100배 가량 빠르게 처리.
([IMDB 종류](https://ko.wikipedia.org/wiki/인메모리_데이터베이스))

## 2. Redis(Remote Dictionary System)
NoSql DB로 기본적으로 key / value 형태로 데이터를 메모리에 저장. 메모리에 저장된 내용을 지속시키기 위해 파일로 싱크하는 기능을 제공.
[DB-Engines.com](http://db-engines.com/en/ranking/key-value+store)에 따르면 가장 인기있는 Key/Value 데이터베이스.
([SQL과 NoSQL 데이터베이스 비교](https://aws.amazon.com/ko/nosql/))
※ BSD 라이센스

## 3. Redis 설치
Redis 접속(http://redis.io/)
[윈도우 버전](https://github.com/MSOpenTech/redis/releases)
- 설치확인
```bash
설치한폴더> redis-cli
127.0.0.1:6370>
```


## 4. Redis Data Types

##### 1) String
######명령어 : http://redis.io/commands#string
- Redis의 가장 기본적인 데이터형으로 Key에 하나의 값을 저장.
- Text 문자열 뿐만 아니라 Integer와 같은 숫자나 JPEG 같은 Binary File까지 저장.
- 데이터의 최대 크기는 512Mb.
```bash
> set mykey myvalue
OK
> get mykey
```
-- `SET`을 이용해서 값을 저장, `Get`을 이용해서 값을 조회.
-- 이미 있는 Key에 대해서는 값을 덮어씀.
<br>
```bash
> set counter 1000
OK
> INCR counter
(integer) 1001
> INCR counter
(integer) 1002
```
-- Automic Increment 같은 연산도 가능.
<br>
```bash
> mset key` "hello" key2 "world"
OK
> get key1
"hello"
> get key2
"world"
> mget key1 key2
1) "hello"
2) "world"
```
-- `MSET`과 `MGET`을 이용해서 한 번에 여러 개의 Key/Value를 저장, 조회.
<br>

##### 2) Lists
######명령어 : http://redis.io/commands#list
- 배열
- 한 Key 에 넣을 수 있는 요소의 최대 개수는 4,294,967,295개(2^32-1)
- List 앞과 뒤에서 PUSH/POP 연산 가능.
- 지정된 INDEX 값을 이용하여 지정된 위치에 데이터를 삽입, 삭제 가능.
```bash
> rpush mylist A
(integer) 1
> rpush mylist B
(integer) 2
> lrange mylist 0 -1
1) "A"
2) "B"
> lpush mylist first
(integer) 3
> lrange mylist 0 -1
1) "first"
2) "A"
3) "B"
```
-- `LPUSH`를 이용해서 리스트의 맨 앞, `RPUSH`을 이용해서 리스트의 맨 뒤에 값을 밀어넣을 수 있다.
-- `LRANGE`로 일정 범위의 값을 조회.
<br>
```bash
> rpush mylist 1 2 3 4 5 "foo bar"
(integer) 9
> lrange mylist 0 -1
1) "first"
2) "A"
3) "B"
4) "1"
5) "2"
6) "3"
7) "4"
8) "5"
9) "foo bar"
```
-- `LRANGE`는 시작과 끝을 위한 두 개의 index 값이 필요하다. 인덱스가 마이너스(-)이면, 리스트의 끝을 기준으로 인덱스 값을 매긴다. 오른쪽 끝의 인덱스는 -1이다. 따라서 "0 - 1"은 0번째 부터 마지막 까지의 범위를 의미.
<br>
```bash
> rpush mylist a b c
(integer) 3
> rpop mylist
"c"
> rpop mylist
"b"
> rpop mylist
"a"
```
-- `POP` 리스트에서 값을 읽는게, 아니라 꺼낸다. 읽으면서 삭제.
<br>
```bash
> rpop yourlist
(nil)
```
-- 비어있는 리스트에 대해서 `POP`을 하면 "nil"을 반환.

##### 3) Hashes
###### 명령어 : http://redis.io/commands#hash
- hash는 value내에 field/string value 쌍으로 이루어진 테이블을 저장하는 데이터 구조.
- 객체를 나타내는데 사용 가능한 데이터형.
- 형태는 lists 와 비슷한데 "필드형", "필드값"의 연속으로 이루어져 있다.
- 한 Key에 포함할 수 있는 field-value 쌍의 최대 개수는 4,294,967,295개(2^32-1)
```bash
> hmset user:1000 username yundream birthyear 1997 verified 1
OK
> hget user:1000
(error) ERR wrong number of arguments for 'hget' command
> hget user:1000 username
"yundream"
> hgetall user:1000
1) "username"
2) "yundream"
3) "birthyear"
4) "1997"
5) "verified"
6) "1"
```

##### 4) Sets
######명령어 : http://redis.io/commands#set
- 정렬되지 않은 string의 집합.
- 집합 이기 때문에 한 Key 에 중복된 데이터는 존재하지 않는다. 즉, 동일한 Key에 "abcd" 라는 값을 두 번 추가해도 sets 상에 "abcd" 라는 값은 하나만 존재하게 된다.
- 이 데이터형의 중요한 장점은 요소의 추가, 제거 및 존재체크 시 소모되는 시간이 sets에 포함된 요소의 수에 관계없이 일정.
- 한 Key에 넣을 수 있는 요소의 최대 개수는 4,294,967,295개(2^32-1)
```bash
> sadd myset 1 2 3
(integer) 0
> smembers myset
1) "1"
2) "2"
3) "3"
```
-- `SADD`명령을 이용해서 set에 새로운 값을 추가.
<br>
```bash
> SISMEMBER myset 3
(integer) 1
> SISMEMBER myset 30
(integer) 0
```
-- `SISMEMBER`명령으로 값 체크.

##### 5) Sorted Sets
######명령어 : http://redis.io/commands#sorted_set
- set 에 "score" 라는 필드가 추가된 데이터형으로, score는 일종의 "가중치"
- sets 와 마찬가지로 동일한 key 에서 각 요소들의 값은 유일. 하지만, score 값은 중복될 수 있다.
- sorted set에서 데이터는 오름 차순으로 내부 정렬되며, 정렬이 되어 있는 만큼 score 값 범위에 따른 쿼리(range query), top rank에 따른 query 등이 가능.
 - score 에 승수를 넣는다던지 해서 랭킹 시스템 등에 사용하기 좋음.
 - 다른 데이터 형의 정렬을 위한 index 값으로 활용.(ex. hashes로 사용자 데이터를 저장하는데 나이에 따른 정렬이 필요하다 할 경우, sorted sets에 요소의 값은 사용자 ID를 score 는 나이값을 넣어서 사용)
- 
```bash
> zadd hackers 1940 "Alan Kay"
(integer) 1
> zadd hackers 1957 "Sophie Wilson"
(integer) 1
>  zadd hackers 1953 "Richard Stallman"
(integer) 1
> zadd hackers 1949 "Anita Borg"
(integer) 1
> zadd hackers 1965 "Yukihiro Matsumoto"
(integer) 1
> zadd hackers 1914 "Hedy Lamarr"
(integer) 1
> zadd hackers 1916 "Claude Shannon"
(integer) 1
> zadd hackers 1969 "Linus Torvalds"
(integer) 1
> zadd hackers 1912 "Alan Turing"
(integer) 1
```
-- `ZADD`의 사용법은 `SADD`와 비슷.
-- 정렬에 사용 할 `score` 매개변수 하나 더 추가된다는 것만 다름.
-- Sorted Sets은 값을 입력 할 때, 정렬
<br>
```bash
> ZRANGE hackers 0 -1
1) "Alan Turing"
2) "Hedy Lamarr"
3) "Claude Shannon"
4) "Alan Kay"
5) "Anita Borg"
6) "Richard Stallman"
7) "Sophie Wilson"
8) "Yukihiro Matsumoto"
9) "Linus Torvalds"
```
<br>
```bash
> ZREVRANGE hackers 0 -1
1) "Linus Torvalds"
2) "Yukihiro Matsumoto"
3) "Sophie Wilson"
4) "Richard Stallman"
5) "Anita Borg"
6) "Alan Kay"
7) "Claude Shannon"
8) "Hedy Lamarr"
9) "Alan Turing"
```
-- 역순
<br>
```bash
> ZREVRANGE hackers 0 -1 withscores
 1) "Linus Torvalds"
 2) "1969"
 3) "Yukihiro Matsumoto"
 4) "1965"
 5) "Sophie Wilson"
 6) "1957"
 7) "Richard Stallman"
 8) "1953"
 9) "Anita Borg"
10) "1949"
11) "Alan Kay"
12) "1940"
13) "Claude Shannon"
14) "1916"
15) "Hedy Lamarr"
16) "1914"
17) "Alan Turing"
18) "1912"
```
-- `WITHSCORES` 옵션으로 score 값도 함께 읽을 수 있다.

## 5. Redis Desktop Manager 설치
Redis Desktop Manager 접속(https://redisdesktop.com/)

## 6. Node + Redis
#### 1) 예제에 필요한 모듈
```bash
npm install redis
npm install express
npm install body-parser
npm install JSON
```
`HTTP POST /profile`에 의해 사용자 프로파일 데이터 저장
`HTTP GET /profile/{사용자 이름}` 요청을 받아 데이터 조회

#### 2) REST API 테스트를 위한 구글 크롬 브라우져의 플러그인 "포스트맨(POSTMAN)" 설치
크롬 웹 스토어 접속 [(설치 고고)](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

Post 요청
http://localhost:5000/profile
```html
Headers
	Content-Type : application/json
Body
	{
    	"name":"terry",
        "address": "Seoul,Korea",
        "company": "Server side group",
        "jobtitle": "Principal consultant"
    }
```

Get 요청
http://localhost:5000/profile/:name
```html
Headers
	Content-Type : application/json

```

