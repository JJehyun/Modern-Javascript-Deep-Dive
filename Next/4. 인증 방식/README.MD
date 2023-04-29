# 인증과 사용자 세션 관리 🎯💡🔥📌✅

<br />

## 여러 인증 방식

- `자격 증명 기반 인증`

  - 사용자의 자격을 증명할 수 있는 비밀 정보를 통해 사용자를 식별한다.
  - `ex) 비밀번호, 이메일 주소`

- `소셜 로그인`
  - 페이스북, 트위터, 구글 같은 소셜 계정을 사용해서 시스템에 로그인하는 방식
- `비밀번호 없이 로그인`

  - 사용자의 이메일로 소위 `매직 링크`라는 것을 보내 비밀번호를 입력하지 않고 인증하는 방식

- `싱글 사인온(SSO)`
  - 각기 다른 서비스에 고유한 자격 증명을 발급하고 중앙에서 사용자 인증을 처리한다.

<br />
<br />

```
📌 스테이트풀 세션

- `세션 쿠키`를 만들고 해당 `세션`과 `관련된 모든 속성`을 관리한다
- 사용자 상태를 전부 서버에서 관리하고 특정 세션 쿠키를 사용해서 이 세션을 해당 클라이언트와 연결한다.
- 애플리케이션 규모가 점점 커지면 복잡해지기 일쑤이다.
- ex) 로그인한 사용자 세션에 사용자 이메일 또는 계정 이름을 기록해두고 페이지를 렌더링할 때마다 이정보를 가져와서 사용하는 방식
```

<br />

```
📌 스테이트리스 세션 (JWT 기반 인증)

- 세션 쿠키를 서버가 아닌 프론트엔트 쪽에 두고 새로운 요청을 보낼 때마다 사용자를 식별할 수 있는 정보를 함께 보내는 방식이다.
- 로그인한 사용자가 백엔드에 요청을 보낼 때 마다 인증 방식에 따라 인증에 필요한 정보를 HTTP 헤더 또는 쿠키로 보내는 것이다.
- 서버는 이 인증 정보를 받아서 검증하고 사용자를 식별한 다음 권한에 따라 사용자가 요구한 서비스 또는 콘텐츠를 제공한다.
```

<br />
<br />

## Json web token

> 공개된 산업 표준 방식으로 인증에 참여하는 두 대상 간에 클레임을 안전하게 주고받을 수 있는 방법이다. <br /> `base64` 방식으로 인코딩된 세 개의 json 데이터를 하나로 연결한 것이다.

- JWT는 `점`으로 연결된 세부분의 데이터로 나눌 수 있다.
  - 첫번째 부분 : JWT 헤더 부분 `두가지의 핵심 정보`
    - 1. `토큰 타입`
    - 2. `토큰을 사인할 때 사용한 알고리즘`
  - 두번째 부분 : `페이로드`
    - 사용자를 식별하기 위한 민감하지 않은 데이터
    - JWT 페이로드는 누구나 볼 수 있기 때문에 민감한 데이터는 포함시키면 안된다.
  - 세번째 부분: `시그니처`
    - 사인을 안전하게

> 필요한 사용자 관련 정보를 가져오면 jwt를 쿠키 또는 HTTP 인증 헤더의 bearer 토큰으로 지정해서 사용할 수 있다.

<BR />

> JWT 예시

```BASH
#첫번째 부분
{
  # 토큰 사인에 사용한 알고리즘
  "alg" : "HS256",
  # 토큰 타입
  "typ" : "JWT"
}
#두 번째 부분
{
  # jwt 서브젝트
  "sub" : "908eafa7-71bd-4203-8f76-b6072cd11e87",
  # 사용자 이름
  "name":"kim",
  # 토큰 발행 일시
  "iat" : 1516239022
}
```

<br />

```
🎯 누구나 JWT를 읽고 풀어볼 수 있다. 하지만 JWT를 수정하더라도 사인에 사용한 비밀값을 알지 못한다면 사인을 다시 만들고 검증 과정을 통과할 수 없다.
```

<br />

---

## 커스텀 인증 서버 🎯💡🔥📌✅

<BR />
<BR />

> 로그인 API `/pages/api/login.js`

```js
// /pages/api/login.js
// 이 함수는 사용자 입력을 받고 인증을 처리한다. POST요청만 입력을 받도록 한다.
export default (req, res) => {
  const { method } = req;
  const { email, password } = req.body;

  if (method !== "POST") {
    return res.status(404).end();
  }

  if (!email || !password) {
    return res.status(400).json({
      error: "Missing required params",
    });
  }

  const user = authenticateUser(email, password);

  if (user) {
    res.setHeader(
      "Set-Cookie",
      // myauth라는 쿠키를 만들고 그안에 사용자 jwt를 저장한다.
      //클라이언트 측에서 발생할 수 있는 잠재적인 보안 위험성을 사전에 차단한다.
      // httpOnly 플래그를 true로 설정해 서버 측에서만 쿠기를 사용할 수 있도록 해야 데이터를 좀 더 안전하게 저장할 수 있다.
      serialize("my_auth", user, { path: "/", httpOnly: true })
    );
    return res.json({ success: true });
  } else {
    return res.status(401).json({
      success: false,
      error: "Wrong email of password",
    });
  }
};
```

```
📌 Nest.js API경로는 모든 HTTP메서드를 허용한다. 하지만 특정 라우트의 경우 특정 메서드만 허용하는 것이 좋다.

ex) 새로운 콘텐츠를 만들 때 POST만 허용하고, 데이터를 읽을 때는 GET, 메서드 수정 PUT, 삭제는 DELETE만 허용
```

<BR />
<BR />

> 인증 관련 커스텀 훅

```JS
import { useState, useEffect } from 'react';

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // useEffect훅이 시작되면 /api/get-session API로 HTTP 요청을 보낸다.
    //API 호출이 성공, 실패되면 사용자 상태나 에러값을 반환하고 Loading 상태값을 false로 만들어서 ui를 다시 렌더링하도록한다.
    fetch('/api/get-session')
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setLoggedIn(true);
          setUser(data.user);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return {
    user,
    loggedIn,
    loading,
    error,
  };
}
```

<br />

> 위 커스텀 훅을 이용해서 사용자가 인증받은 상태에서만 콘텐츠를 표시하도록 만들기

```js
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";
import styles from "../styles/app.module.css";

export default function ProtectedRoute() {
  const router = useRouter();
  const { loading, error, loggedIn } = useAuth();

  if (!loading && !loggedIn) {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {error && <p> An error occurred. </p>}
      {loggedIn && (
        <>
          <h1>Protected Route</h1>
          <p>You can't see me if not logged-in!</p>
        </>
      )}
    </div>
  );
}
```

<br />
<br />
<br />

## Auth0 를 이용한 로그인 처리

- Auth0를 사용하면 로그인,로그아웃,비밀번호 초기화 등의 같은 수많은 기능을 따로 구현 해야하지만, Auth0를 사용하면 이 모든 기능을 제공해준다.

<br />
<br />

> 상용 수준의 웹 애플리케이션을 만들 때는 이미 만들어진 외부 인증 서비스를 사용하는 것이 보안이나 신뢰도 측면에서 훨씬 좋은 측면이다.

<br />

> .env.local

```bash
# AUTH0_SECRET
AUTH0_SECRET=f9123124e1231234r213215f123534
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='http://your_auth0_domin.auth0.com'
AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
AUTH0_CLIENT_SECRET="YOUR_AUTH0_CLIENT_SECRET"
```

<br />

- `AUTH0_SECRET` : 임의로 생성된 문자열값으로 Auth0가 세션 쿠키값을 암호화할 때 사용할 비밀키
- `AUTH0_BASE_URL` : 애플리케이션 기본 URL , 로컬에서 개발하는 경우 : `http://localhost:3000`
- `AUTH0_ISSUER_BASE_URL` : Auth0 애플리케이션의 URL이다. 콜백 URL을 지정하는 `[Setting]` 화면의 `[Domin]`이 여기 해당한다.
- `AUTH0_CLIENT_ID` : Auth0 애플리케이션의 클라이언트 ID
- `AUTH0_CLIENT_SECRET` : Auth0 애플리케이션의 클라이언트 비밀값

<br />

---

## Auth0를 이용해서 인증 방식 처리하기

<br />

> 1. Auth0 설치

```
$ yarn add @auth0/nextjs-auth0
```

<br />

> 2. page/api/auth/[...auth0].js

```js
import { handleAuth } from "@auth0/nextjs-auth0";

export default handelAuth();
```

<br />

> 3. handleAuth() 메서드 이용하기

```bash
# Next.js 서버를 시작하면 handleAuth() 메서드가 다음 api를 제공한다

- /api/auth/login : 애플리케이션에 로그인 할 수 있는 api

- /api/auth/callback : Auth0를 통해 성공적으로 로그인한 경우 사용자를 다시 되돌려보내는 콜백 url

- /api/auth/logout : 애플리케이션에서 로그아웃할 수 있는 api

- /api/auth/me : 사용자가 로그인한 후 사용자 정보를 json 형태로 가져올 수 있는 엔드 포인트
```

<br />

> 4. 모든 페이지 UserProvider로 묶기

```js
// 브라우저에서 http://localhost:3000/api/auth/login으로 접근하면 로그인 페이지로 접근이 가능하다.
import { UserProvider } from "@auth0/nextjs-auth0";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
```

<br />

```js
import { useUser } from "@auth0/nextjs-auth0";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <div>
        <h1> Welcome back! </h1>
        <p> You're logged in with the following email address: {user.email}!</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return (
    <div>
      <h1> Welcome, stranger! </h1>
      <p>
        Please <a href="/api/auth/login">Login</a>.
      </p>
    </div>
  );
}
```

<br />
<br />
<br />

---

## `next-auth 사용`

- 소셜 로그인 시 사용되는 편리한 라이브러리

<br />

> 1. Nest-auth 세팅

```js
//page/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import { GithubProvider, GoogleProvider } from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "id",
      clientSecret: "id_Secret",
    }),
    GoogleProvider({
      clientId: "id",
      clientSecret: "id_Secret",
    }),
  ],
  secret: "jwt_password",
};
export default NextAuth(authOptions);
```

<br />

> 2. 로그인, 로그아웃 버튼 생성

```js
"use client";
import { signIn, signOut } from "next-auth/react";

export default function Button() {
  return (
    <>
      <button
        onClick={() => {
          signIn();
        }}
      >
        버튼
      </button>
    </>
  );
}
```

<br />

> 3. 현재 로그인한 유저의 정보 가져오기

```js
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSesstion } from "next-auth";

export default async function Page({}) {
  //현재 로그인한 유저 이름,이메일 등등을 가져올 수 있음
  //서버 컴포넌트에서 사용가능
  await getServerSesstion(authOptions);
  return <></>;
}
```

<br />
<br />

---

<br />
<br />

## Dynamic route

- 비슷한 폴더명이 많이 필요할 때 사용
- `detail/[sulg]/index.page.js`

<br />

> url정보 가져오기

```js
//localhost:3000/detail/123
//detail/[sulg]/index.page.js
//유저가 url에 입력한 값 가져오는 방법
export default async function Page(props) {
  //url의 params의 정보를 가지고 있음
  console.log(props);
  return <></>;
}
```

<br />
<br />

---

## useRouter

- `client component에서만 사용`

<br />

- `usePathname()` : 현재 URL 출력
- `useSearchParams()` : Search parameter 출력
- `useParams()` : 위 `Dynamic route` 출력

<br />
<br />

```js
// 클라이언트 사이드 렌더링 사용
"use client";

import { useRouter } from "next/navigation";

export default async function Page(props) {
  let router = useRouter();
  return (
    <>
    {/* 페이지 이동 */}
    <div onClick-{()=>{router.push('/')}}/>
    {/* 페이지 뒤로가기 */}
    <div onClick-{()=>{router.back()}}/>
    {/* 페이지 앞으로 가기 */}
    <div onClick-{()=>{router.forward()}}/>
    {/* 페이지 새로고침 */}
    <div onClick-{()=>{router.refresh()}}/>
    {/* 페이지 미리로드 */}
    <div onClick-{()=>{router.prefetch('/Detail')}}/>
    </>
  )
}
```

<br />
<br />

---

## static, dynamic rendering 수정

- 렌더링 방식 강제 수정

<br />

> 예시

```js
// 페이지 static 렌더링 방식으로 강제 변경
export const dynamic = "force-static";
// 페이지 dynamic 랜더링 방식으로 강제 변경
export const dynamic = "force-dynamic";

export default function Page() {
  return <></>;
}
```

<br />
<br />

## 페이지 단위 캐싱 기능

- revaildate 예약 변수 사용

<br />

> 페이지 단위 캐싱

```js
//120초 캐싱
export default revalidate = 120;

export default async function Page() {
  return <></>;
}
```

---

<br />
<br />

## `Loading.js , error.js`

<br />

> 폴터 구조

```
/page
  - error.js
  - loading.js
  - page.js
  - not-found.js
```

> 모든 page.js 옆에 loading.js 생성하면 로딩 중 컴포넌트를 띄우기

```js
//내부적으로 동작하는 방식
<Suspense fallback={loading.js}>{/*page.js내용*/}</Suspense>
```

<br />

> error.js 페이지에서 에러 났을 때 error 페이지 보여주기

```js
// 클라이언트 컴포넌트에만 사용 가능
"use client";

//error : 에러에 관한 정보
//reset : 페이지 다시 로드
export default function Error({ error, reset }) {
  return <></>;
}
```

<br />

> 404페이지 생성

```js
import { notFound } from "next/navigation";

export default function Page() {
  //Page대신 not-found.js를 대신 보여주게 된다.
  if (result === null) return notFound();
  return <></>;
}
```
