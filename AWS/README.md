# AWS

## EC2 Free Tier 시작 (1)

> 실수로 프론트 코드 폴더 : frontend 백엔드 코드 : `backand` 이 부분 실수

- FreeTier (Amazon Linux)
  - EC2 (t2.micro) : OS
  - Gib 30 / gp2 : Storage
  - Network
    - 보안 그룸 name 설정
    - 보안 그룹 규칙 추가
      - 1. 포트 범위 : 80 , 소스 유형 : 위치 무관 , 설명 : http
      - 2. 포트 범위 : 443 , 소스 유형 : 위치 무관 , 설명 : https
  - keypair
    - RSA 유형 , .pem 파일 형식
    - Key Pair name 설정
- 인스턴스 시작

<br />
<br />

## 인스턴스 접속 (2)

- .pem 파일 chmod 400 으로 권한 변경
- 권한 변경 후 아래 코드로 인스턴스 접속
  - ssh -i ---.pem ec2-user@[ec2 ip]
  - re you sure you want to continue connecting (yes/no/[fingerprint])? yes
- AWS 인스턴스 접속 완료

<br />
<br />

# 인스턴스 EC2 필요 라이브러리 설치 (3)

## git : 버전관리

## htop : cpu , memory 상태 확인

```node
sudo yum install git htop -y
```

<br />

## 홈 디렉토리 local 폴더 생성 후 node.js 설치

```bash
mkdir ~/local
cd ~/local
# node 다운로드 경로
wget https://nodejs.org/dist/v18.16.1/node-v18.16.1-linux-x64.tar.xz
# 노드 압축 해제
tar xvf node-v16.14.0-linux-x64.tar.xz
cd cd node-v18.16.1-linux-x64/bin/
# 현재 경로 복사
pwd
# path 지정
vi ~/.bash_profile
# path 지정 후 적용
source ~/.bash_profile
```

<br />

> ~/.bash_profile 파일

```bash
# .bash_profile

# Get the aliases and functions
if [-f ~/.bashhrc]; then
        . ~/.bashrc

fi

# User specific environment and startup programs
PATH=$PATH:$HOME/.local/bin:$HOME/bin
# 예시 PATH=$PATH:/home/ec2-user/local/node-v16.14.0-linux-x64/bin
PATH=$PATH:[node.js bin 경로]

export PATH
```

<br />

## nginx , nodejs연결

<br />

> nginx 설치

```bash
# nginx 설치
sudo yum install nginx
# nginx 설정 파일
sudo vi /etc/nginx/nginx.conf

## 설정 파일에 아래 코드 삽입

    location / {
        sendfile off;
        proxy_pass         http://127.0.0.1:4000;
        proxy_redirect     default;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_max_temp_file_size 0;
    }

# nginx 설정이 잘되었는지 확인 (nginx: the configuration file /etc/nginx/nginx.conf syntax is ok)
sudo nginx -t

# nginx 실행
sudo systemctl start nginx
# 서버가 재시작 되더라도 자동으로 nginx 실행될 수 있도록 설정
sudo systemctl enable nginx
# 서버 재실행
sudo systemctl restart nginx
# 웹서버 테스트 구동
curl localhost
```

<br />

> nginx 설정 파일

```bash
server {
listen 80;
listen [::]:80;
server_name _;
root /usr/share/nginx/html;
# Load configuration files for the def

    location / {
        sendfile off;
        proxy_pass         http://127.0.0.1:4000;
        proxy_redirect     default;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_max_temp_file_size 0;
    }

error_page 404 /404.html;
location = /404.html {
}
error_page 500 502 503 504 /50x.html;
location = /50x.html {
}
}
```

<br />

# 최초 프로젝트 빌드와 실행 (4)

## pm2 설치

- node.js 서버를 띄우기 위해 pm2 설치

```bash
npm install -g pm2
```

<br />

## 배포할 코드 불러오고, 구동하기

```bash
# git 폴더 생성 후 이동
mkdir ~/git
cd ~/git
# git 코드 불러오기
git clone [배포할 git code 주소]
# 프론트엔드 코드로 이동 후 라이브러리 설치 (프로젝트마다 구조 상이) , 빌드
cd frontend
npm i
npm run build
# 빌드된 폴더안의 모든 것을 (dist/*) 백엔드 (backend/pulic)폴더로 이동 시킴
# cp -rf dist/* [백엔드/public 폴더]로 이동
cp -rf dist/* /home/ec2-user/git/backfront/backand/public


# 빌드된 프론트 코드 구동
# 백엔드 코드 라이브러리 설치
cd backend
npm i
# backend 폴더 위치에서 아래 코드 실행
# pm2가 웹을 백그라운드에서 실행하고, 장애가 발생할 경우 재시작 하는 명령어
# web이라는 이름으로 빌드된 프론트 코드 구동
pm2 start bin/www --name web
# pm2 구동 중인 리스트 확인
pm2 list
## 이제 프론트 웹 페이지 접근 가능
## 이제 프론트 웹 페이지 접근 가능
## 이제 프론트 웹 페이지 접근 가능
## 이제 프론트 웹 페이지 접근 가능

```

<br />
<br />

# 도메인 등록 (5)

## Route 53도메인 등록

- 도메인 검색
  - 원하는 도메인 선택 후 결제 (10~30달러 년간)

<br />

## HTTPS 인증서 섧정

- LetsEncrypt 관련 라이브러리 설치

````bash
# 관리자 로그인
sudo u -
# 아래코드 한 줄씩 실행
sudo su -
dnf install python3 augeas-libs
dnf remove certbot
python3 -m venv /opt/certbot/
/opt/certbot/bin/pip install --upgrade pip
/opt/certbot/bin/pip install certbot certbot-nginx
ln -s /opt/certbot/bin/certbot /usr/bin/certbot```
#위 코드를 다 실행하면 certbot --nginx 명령어로 도메인 인증서를 발급받을 수 있다.
certbot --nginx
## Y -> Y NGINX 설정을 바꾸어줬기 때문에 자동으로 도메인을 인식한다. 인증서 발급이된다.

## 인증 후에 서버 재시작
nginx -t
systemctl restart nginx

##재접속하면 도매인 https인증서 적용 완료!!
##재접속하면 도매인 https인증서 적용 완료!!
##재접속하면 도매인 https인증서 적용 완료!!
````

<br />

> 인증서 유효기간이 3달이기 때문에 인증서 기간 연장을 위한 스케줄링을 하나 등록한다.

```bash
# 인증서 기한 연장 코드 한줄
echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew" | sudo tee -a /etc/crontab > /dev/null

cat /etc/crontab
```

<br />
<br />

# CI/CD 구성하기 (배포 자동화) (5)

## .github/workflows/deploy-main.yml 파일 생성

- main branch에서 push 이벤트 실행 시 아래 job 실행
- `ssh 접속`이 완료되면, 접속한 home 디렉토리에 있는 /.deploy라는 script 실행

```bash
# .github/workflows/deploy-main.yml 에
# 아래 코드 삽입
name: remote ssh command for deploy
on:
 push:
   branches: [main]
jobs:
 build:
   name: Build
   runs-on: ubuntu-latest
   steps:
     - name: executing remote ssh commands using key
       uses: appleboy/ssh-action@master
       with:
         host: ${{ secrets.HOST }}
         username: ${{ secrets.USERNAME }}
         key: ${{ secrets.KEY }}
         port: ${{ secrets.PORT }}
         script: |
           ./deploy.sh
```

<br />

## git Secrets 파일 생성

- setting -> Secrets and Variables -> Actions - New repository secret
  - Name , Value 설정
  - 에서 HOST / USERNAME / KEY / PORT 등등 생성
    - HOST : 프론트 주소
    - KEY : ssh 접속 .pem 파일
    - PORT : 22
    - USERNAME : ec2-user (ec2 접속 아이디)

<br />

## EC2 서버에 deploy.sh 파일 생성

> 서버에 접속하지 않고 Github Actions 설정으로 저장소의 main 브랜치가 변경될 때마다 서버에 최신 버전을 받아 자동 빌드하고 재시작

- vi ~/deploy.sh (홈 디렉토리에 deploy.sh 파일 생성) 후 아래 파일 생성
- 아래코드 삽입(:wq) 후 `chmod +x ~/deploy.sh` 권한 추가
- 권한이 잘 부여됐다면 ls -altr 했을 때 초록색으로 보이게 된다.

```bash
#!/bin/bash
# 환경 변수 적용
source ~/.bash_profile
# 프론트코드로 이동 후 pull and build
cd ~/git/backfront/
git pull origin main
cd frontend/
npm i
npm run build
# backend public 폴더로 build 파일 이동 시킴 후 백엔드 라이브러리 설치
cp -rf dist/* ../backand/public
cd ../backand/
npm i
# pm2 재실행 (백엔드 상에서)
pm2 stop web
pm2 start bin/www --name web --update-env
sleep 2
pm2 list
```

<br />

## 마지막 CORS 설정 (6) (express.js 기준)

> 도메인을 origin이라고 표현, 도메인이 달라질 경우 보안 때문에 정보를 주고 받는 규칙이 생기게 된다. 이것이 CORS 규칙

```
도메인이 달라질 때 발생하는 이슈가 CORS이다. Cross Origin Resource Sharing을 뜻한다.
프론트엔드는 3000번 포트를 사용하고, 백엔드는 4000번 포트를 사용하기 때문에 API를
호출할 때 http://localhost:4000/api/hello 주소를 사용한다. 만약 /api/hello URI와 같이,
도메인을 사용한다면 발생하지 않는다
```

- backend root 폴더에서 npm i -S cors 설치
- backend/app.js에서 아래 코드 추가
  - cors 설정 끝

```js
//..
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

var cors = require("cors");
app.use(cors());

//view engine setup
//..
```

<br />

- 위처럼 설정한다면 실서버에서 localhost부분을 없애야한다.
- .env.local 파일을 생성 (프론트엔드)
  - 빌드도구는 vite를 사용하기 때문에 vite 환경변수를 설정해준다.

```bash
# 로컬의 환경 변수 설정
# .env.local (로컬에서 - frontend) 적용 코드
VITE_API_SERVER=http://localhost:4000

# .env (실서버에서 - feontend) 적용 코드
# cd frontend / vi .env
# ~/deploy.sh : 홈에서 deploy파일 이용해서 빌드 후 배포
VITE_API_SERVER=


# 다른 파일에서 환경 변수 불러오기
import.meta.env.VITE_API_SERVER
```
