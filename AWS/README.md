# AWS

## EC2 Free Tier 시작 (1)

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
