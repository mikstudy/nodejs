1주차 스터디
=====

##### 1. git 클라이언트 설치
- <https://git-scm.com/downloads>
- Windows에서 git 설치시 다음 옵션들을 선택.
  - Run Git from the Windows Command Prompt (윈도우 명령 프롬프트에서도 git 사용)
  - Checkout Windows-style, commit Unix-style line encodings
<br>

##### 2. git 계정 생성 및 SSH 키 등록
- <https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account>
- 다음 항목에선 그냥 엔터 입력 할 것. (passphrase를 설정하면 push 할 때마다 매번 입력해야 한다.)
  - Enter file in which to save the key: 그냥 엔터
  - Enter passphrase (empty for no passphrase): 그냥 엔터
  - Enter same passphrase again: 그냥 엔터

<br>
##### 3. git 계정 정보 저장
```
  $ git config --global user.name "[이름(예: JiHyung Lee)]"
  $ git config --global user.email "[이메일(예: jhlee.8804@gmail.com)]"
```

<br>
##### 4. git 사용 가이드
- <https://rogerdudler.github.io/git-guide/index.ko.html>

<br>
##### 5. github 저장소 생성 후 팀원(Collaborators) 초대
- <https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/>

<br>
##### 6. study 저장소를 로컬로 복제
`$ git clone [UserID]@github.com:mikstudy/nodejs.git`

<br>
##### 7. SourceTree 설치 후 로컬에 복제 된 저장소를 불러오기
- https://www.atlassian.com/software/sourcetree

