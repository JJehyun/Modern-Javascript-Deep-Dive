# Docker

💡💡💡💡

```bash
# 실행 중인 컨테이너에는 영향을 주지 않는다.
# 도커를 쓰지 않을 때 모두 정리하고 싶을 때 사용하면 좋다.
docker system prune

# 컨테이너를 실행하기 위해 사용할 명령어
docker run -p 49160:8080 [이미지 이름]

# 수정된 코드 바로 반영되게
docker run -d -p 5000:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app <이미지 아이디>
```

💡💡💡

| 제목 | 내용                                                                    |
| ---- | ----------------------------------------------------------------------- |
| 00   | 도커 생명 주기 , 도커 exec , run ...                                    |
| 01   | 도커 이미지 만들기                                                      |
| 02   | Docker Volumn , 도커 로컬 코드 참조 (코드 변경 시 바로 반영)            |
| 03   | docker compose (여러 컨테이너 끼리의 간편한 네트워크 통신) , docker.yml |
| 04   | docker VOLUME / compose 이용해서 배포                                   |
| 05   | ElasticBeanstic 초기 세텅 - travis-ci 연동, role 추가 및 에러 핸들링    |
| 06   | ElasticBeanstic react 간단 배포하는 방법                                |
