# OAUTH 2.0

- Resource Owner : 서비스 사용자
- Resource Server : Google,FaceBook,...
  - Resource Server : 데이터를 가지는 서버
  - Authorization Server : 인증과 관련된 일을 전담하는 서버
- Client : OAuth를 이용하는 웹앱

<br />

---

## Auth 한 눈에 보기

- ![image](../image/Oauth8.png)

<br />

## (1) register 등록

- `Client Id` , `ClientSecret` , `redirect url` 발급
- Client
  - [`Client Id` , `ClientSecret`] 보관
- `Resource Server`
  - [ `Client Id` , `ClientSecret` , `redirect url`] 보관

<br />

## (2) Authority 기능 권한 부여

- ![image](../image/Oauth1.png)
- `Resource Server`는 사용자가 보낸 `Client_id값` 와 `redirect_url`를 확인하고 맞다면 `scope`(사용하고자 하는 기능)을 `Client`에게 부여한다.
- ![image](../image/Oauth2.png)
- `Client id`가 1인 어플 사용자 `userId` :1 는 Resource Server의 기능 Scope : b,c를 client id가 1인 어플에서 사용하는 것을 허용

<br />

## (3) Authorization code (임시 비밀번호) 발급

- ![image](../image/Oauth3.png)
  - `Resource Server`가 사용자에게 `Location`으로 `redirection`해서 Client에게 임시 비밀번호인 `Authorization code`를 전송한다.
- ![image](../image/Oauth4.png)
  - `Authorization code`를 받은 Client는 Resource Server에 `Authorization code` , `Client id` , `Client Secret` , `redirection_url`의 정보를 보내게 된다. 이정보가 유효하다면 access token를 발급하게 된다.

<br />

## (4) access token 발급

- ![image](../image/Oauth5.png)
  - accessToken - 4로 `resource server`로 접근한다면, `Resource server`는 유효한 기능 b,c에 대한 기능에 대한 권한을 가진 userId:1 으로 인식한다.

<br />

## (5) refresh token 발급

- ![image](../image/Oauth6.png)
- access token 만료 이후 access token 발급
  - `Client` > 권한 허가 요청 > `Resource server`
  - `Client` < accessToken , RefreshToken 발급 < `Resource server`
  - `Client` > accessToken 으로 API 호출 > `Resource server`
  - `Client` < Invalid Token Error (토큰 만료) < `Resource server`
  - `Client` > RefreshToken (access 토큰 발급 요청) > `Resource server`
  - `Client` < accessToken(발급 완료) < `Resource server`
