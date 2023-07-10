# Nextjs 간단 배포

## 인스턴스 시작

- 이름 및 태그 : 원하는 이름
- OS : Ununtu Server freetier
- 키페어 생성 : ✅ RSA (.pem)
- 방화벽 : ✅ 보안 그룹 생성
  - ✅ 위치 무관 (접속 ip가 계속 변한다면)
  - ✅ 인터넷에서 HTTPS 트래픽 허용
  - ✅ 인터넷에서 HTTP 트래픽 허용
    (백엔드 https 통신 구현이 안되어 있다면)
- 스토리지 구성 : 1x30 GiB gp2
- 인스턴스 생성

## 인스턴스 연결 후 기본적인 세팅

- ![image](../../image/d63.png)

```bash
# 기본적인 우분투 업데이트
sudo apt-get update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

# 설치 확인작업
node -v
npm -v # npm은 node를 설치하면 따라 설치된다.
node -e "console.log('Running Node.js ' + process.version)"
```

<br />

## 소스 다운 후 build

- ![image](../../image/d64.png)

```bash
git clone ""

npm run build

npm run start

# 포트포워딩
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

<br />

## pm2

- ![image](../../image/d65.png)

```bash
# ›
npm install pm2 -g

pm2 start npm --name "next" -w -i max -- start
```

<br />

# Route 53 연결

- ![image](../../image/d67.png)
- 레코드 생성
  - value값에 ip만 넣어주면 끝
  - value : 12.31.142.12
