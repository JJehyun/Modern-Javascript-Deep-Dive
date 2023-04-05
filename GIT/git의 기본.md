# git 기본🎯💡🔥📌✅

<br />

## git 버전 관리 하기

<br />

- `git 작업을 시작할 때 (init)`

  - `git clone` : 레파지토리를 폴더에 클론해서 저장한다는 의미
  - `git init` : 현재 디렉토리에 작업을 진행한다는 의미
  - 두 명령어 모두 `.git` 파일을 생성한다. (버전 관리에 활용되는 파일)

<br />

- `git add [관리할 파일 명]`

  - `git add .` : 모든 파일을 버전 관리 하겠다는 의미
    - `stage area`상태가 된다.
  - git 에게 관리 해야 할 파일이 무엇인지 알리는 명령어
  - add를 한 파일만이 commit 된다.

- `git commit -m "버전에 대한 메세지"`

  - 지금까지 작업한 내용을 버전으로 만들기
  - `git log`로 지금까지 만든 버전에 목록을 확인 할 수 있다.
  - `commit`하나당 하나의 작업을 가지고 있는 것이 가장 이상적이다.

- `git push origin main`
  - 원격저장소에 저장하기

<br />
<br />
<br />

## git 변경 사항 확인하기 (버전과 버전 사이의 소스코드 상의 차이점 확인)

<br />
<br />

- `git log` : 지금까지의 commit 버전을 확인 할 수 있다.
  - `git log -p` : 각각의 버전 들의 소스상의 차이점을 확인 할 수 있다.
  - ![image](../image/g1.png)
    - commit 메세지 : 2 , commit id : 6838b....
- `git diff [commitID..commitID]` : 두개의 버전 소스 간의 차이점을 확인 할 수 있다.
  - ![image](../image/g2.png)
  - `git diff` : 현재 작성한 코드와 이전 커밋과의 차이점을 알려준다.

<br />
<br />

## commit를 취소하는 명령어 (reset VS revert)

- `reset 명령어` : 위에 커밋을 삭제 후 과거의 커밋을 최신 버전으로 만드는 명령어(원격저장소에 올리지 않았을때만 사용)

  - `git reset 441c339cda... --hard`명령어를 실행 했을때
  - ![image](../image/g3.png)
  - ![image](../image/g4.png)

- `revert` : 커밋을 취소하면서 새로운 버전을 만드는 것
