# aws serverless

## 개인 보안 강화 (1) [MFA] 설정

- Root 사용자에 대한 MFA 적용
  - 내 핸드폰에서 Twilio Authy 어플 설치
  - 내정보 -> 보안 자격 증명 -> MFA할당 -> 인증 관리자 앱 선택
    - 어플 내에서 QR 코드 촬영
    - MFS code 1 / MFS code 2 (Twilio Authy 어플에 나와 있는 코드2개 연속으로 입력)
  - IAM 대시보드에서 ✅루트 사용자에게 MFA 있음 / ✅루트 사용자에게 활성 액세스 키가 없음 되어 있으면 완료

<br />

## IAM Group 생성

- IAM 대시보드 -> 사용자 그룹 -> 그룹 생성
  - 사용자 그룹 이름 : admin-2
  - 권한 정책 연결 - 선택사항 : ✅ AdministratorAccess [그룹의 관리자 권한 부여]
  - 그룹 생성

<br />

- IAM 대시보드 -> 액세스 관리 -> 사용자 추가

  - 사용자 이름 : admin-2
  - ✅ AWS Management Console에 대한 사용자 액세스 권한 제공 – 선택 사항
    - ✅ IAM 사용자를 생성하고 싶음 (나머지는 default[자동 생성 암호 , Users must create a ...])
  - 다음
  - ✅ 직접 정책 연결
    - ✅ AdministratorAccess
  - 다음 후 사용자 생성

  ```bash
  # 아래 sign-in / password로 아마존 로그인 가능
  Console sign-in
  [Copy] : https://???????????.com/console <- 로그인할때 ?????만 넣어주면 됨
  User name
  [Copy] : ????
  Console password
  [Copy] : ?????????


  # 위에 만든 사용자 그룹에 https://???????????.com/console 검색 해서 사용자 추가
  # 위에 만든 사용자 그룹에 https://???????????.com/console 검색 해서 사용자 추가

  # 로그인 마다 [iam]
  Console sign-in : 코드12자리
  User name : nickname
  password : password
  MFA를 입력해야 로그인이 가능
  ```
