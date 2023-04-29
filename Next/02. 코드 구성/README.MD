# 코드 구성 🎯💡🔥📌✅

> 애플리케이션의 코드를 쉡게 유지 보수하고 확장하려면 프로젝트 구조를 간결하고 분명하게 구성하고 유지하는 것이 중요하다.<br /> app.js, document.js, pages/ , public/ 디렉터리는 정해진 위지에 존재해야한다.

<br />
<br />

## 1. 컴포넌트 구성

`아토믹 디자인 원칙`

- `component/`
  - `atoms` :
    - `button, input와 같은 표준 HTML 요소를 감싸는 용도로 사용`되거나, 애니메이션 또는 컬러 팔레트 등과 같은 용도로 사용되는 컴포넌트를 이곳에 저장합니다.
  - `molecules` :
    - atoms에 속한 컴포넌트 `여러 개를` 조합해서 `더 복잡한 구조`를 만드는 컴포넌트들이다.
    - ex) input과 label 컴포넌트를 가져와서 만든 새로운 컴포넌트가 속함
  - `organisms`
    - `molecules`와 `atom`를 섞어서 더 복잡한 구조의 컴포넌트를 만든다.
    - EX) 회원가입 양식, 푸터, 캐러셀
  - `template`
    - 일종의 페이지 스켈레톤, 어디에 `atoms`, `molecules`, `organisms`를 배치할 지 결정해서 사용자가 접근할 수 있는 페이지를 만든다.

<br />
<br />
<br />

## 2. 유틸리티 구성

`유틸리티 스크립트`

- 유틸리티 함수들을 각각의 목적에 맞게 서로 다른 파일로 구분 가능

> 유틸리티 스크립트 폴더 구조 예시

- `utilities/`
  - `time.js`
  - `localstorage.js`
  - `jwt.js`
  - `logs.js`

<br />
<br />
<br />

## 3. 정적 자원 구성

> Nest.js에서는 정적 파일을 쉽게 제공할 수 있다. <br /> 제공할 파일을 public/ 디렉터리 아래에 두면 나머지는 프레임워크가 알아서 해주기 때문

<br />

- `public`
  - `asset`
    - `css`
    - `icons`
    - `images`

<br />

```
localhost/asset/css/이름1
localhost/asset/icons/이름2
localhost/asset/images/이름3
```

<br />
<br />

## 데이터 불러오기

서버에서 데이터 불러오기

- 정적 페이지 만들 때
  - getStaticProps : 빌드 시점에 데이터 불러옴
  - `getServerSideProps` : 서버가 페이지를 렌더링 할 때 실행 도중에 데이터를 불러옴
    - 이 내장 함수를 사용하는 편이 좋다

<br />

> `getServerSideProps`를 이용한 예시

```jsx
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps() {
  const userReq = await axios.get("https://api.rwnjs.com/04/user");
  return {
    props: {
      users: userReq.data,
    },
  };
}

function HomePage({ user }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
```

> `url query params 전달 받기`

```js
//localhost:3000/users/이름11
import axios from "axios";
export async function getServerSideProps(ctx) {
  const { username } = ctx.query;
  // username = 이름11
  const userReq = await axios.get("https://api.rwnjs.com/04/user");
  return {
    props: {
      users: userReq.data,
    },
  };
}

function UserPage({user}){
    return (
        //...
    )
}
```

<br />
<br />
<br />

## 요청한 url이 없을 때 404 페이지 반환 하는 방법

- localhost:3000/users/missmatch
  - `missmatch`가 없으면 Error

> 폴더 구조

```
page/
  - user/
    -[username].js
```

> 404 예시 코드

```js
//localhost:3000/users/missmatch
export async function getServerSideProps(ctx) {
  const { username } = ctx.query;
  const userReq = await axios.get("https://api.rwnjs.com/04/user${username}");

  // status 404반환할 때 404 페이지 반환
  if (userRef.status === 404) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      users: userReq.data,
    },
  };
}
```

<br />
<br />

## 클라이언트에게 인증토큰을 노출하지 않고, 서버가 HTTP 요청을 보내서 그 결과만 클라이언트로 전송하는 코드

> pages/api/singleUser

```js
import axios from "axios";

export default async function handler(req, res) {
  if (!req.query.username) {
    res.status(403).json({
      error: 'Missing "username" query parameter',
    });
    return;
  }
  const username = req.query.username;
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const API_TOKEN = process.env.API_TOKEN;

  const userReq = await axios.get(`${API_ENDPOINT}/api/04/users/${username}`, {
    headers: { authorization: API_TOKEN },
  });

  res.status(200).json(userReq.data);
}
```

```js
// pages/user/[username].js
import { useEffect, useState } from "react";
import Link from "next/link";

function UserPage({ username }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const req = await fetch(`/api/singleUser?username=${username}`);
      const data = await req.json();

      setLoading(false);
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
      <hr />
      {loading && <div>Loading user data...</div>}
      {data && <UserData user={data} />}
    </div>
  );
}

export default UserPage;
```

<br />
<br />

```
 💡 pages/api/ 폴더안의 내용

📌 pages/api/ 디렉터리 안의 모든 파일은 Next.js가 API 라우트로 처리한다.

📌 req : http.IncomingMessage인스턴스이머, 여기에는 [req.cookie] , [req.query] , [req.body] 같은 미리 만들어진 미들웨어가 포함되어 있다.

📌 res : http.serverResponse 인스턴스이머, 여기에는 [res.status] , [res.json] , [res.send] , [res.redirect] 등의 미들웨어가 포함되어 있다.

```

# 지역 및 전역 상태 관리 🎯💡🔥📌✅

<br />

## 지역 상태 관리 (context API 예제)

<br />

> 지역 상태 관리에 있어서 애플리케이션의 상태는 컴포넌트 스코프 상태를 의미한다.

> 1. 상태 관리

```js
//component/context/cartContext.js
import { createContext } from "react";

const ShoppingCartContext = createContext({
  items: {},
  setItems: () => null,
});

export default ShoppingCartContext;
```

<br />

> 2. `_app.js`를 Context로 묶어줌

```js
// _app.js안에 컴포넌트들은 전역 상태에 접근할 수 있다.
import { useState } from "react";
import Head from "next/head";
import CartContext from "../components/context/cartContext";

function MyApp({ Component, pageProps }) {
  const [items, setItems] = useState({});

  return (
    <>
      <CartContext.Provider value={{ items, setItems }}>
        <div className="w-9/12 m-auto pt-10">
          <Component {...pageProps} />
        </div>
      </CartContext.Provider>
    </>
  );
}

export default MyApp;
```

<br />

> 3. useContext를 이용해서 전역객체 이용하기 (끝)

```js
//useContext 훅을 이용해서 _app.js 페이지의 setItem과 items를 ProductCard 컴포넌트와 연결
// 이 컴포넌트에서 setItem를 호출할 때 마다 전역items 객체를 변경하며, 변경된 객체는 다시 동일한 콘텍스트 아래에 있거나 동일한 전역 상태에 연결된 모든 컴포넌트로 전파된다.
import { useContext } from "react";
import cartContext from "../component/context/cartContext";

function ProductCard({ id, name, price, picture }) {
  //전역 객체 사용
  const { setItem, item } = useContext(cartContext);
  const productAmount = id in items ? items[id] : 0;

  const handleAmount = (action) => {
    if (action === "increment") {
      const newItemAmount = id in items ? items[id] + 1 : 1;
      setItem,[id]:newItemAmount
    }
    if (action === "decrement") {
      if(items?.[id] > 0){
        setItem({...items, [id]:items[id] - 1})
      }
    }
  };
}
```

<br />
<br />

---

## Redux 전역 상태값 관리

<br />
<br />

> 1. store라는 변수를 만들어서 Redux 스토어를 저장하고 사용

```js
import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;
// Redux스토어가 사용할 변수 initialState , 전역 state
const initialState = {};

// 일반적으로 여러개의 리듀서를 만들지만, 예시로 파일 내에 하나만 생성
const reducer = (state = initialState, action) => {
  const itemID = action.id;

  switch (action.type) {
    case "INCREMENT":
      const newItemAmount = itemID in state ? state[itemID] + 1 : 1;
      return {
        ...state,
        [itemID]: newItemAmount,
      };
    case "DECREMENT":
      if (state?.[itemID] > 0) {
        return {
          ...state,
          [itemID]: state[itemID] - 1,
        };
      }
      return state;
    default:
      return state;
  }
};
// store 초기화를 위한 함수 (1)
function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}
// store 초기화를 위한 함수 (2) , 스토어 설정 준비 끝
export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};
// 컴포넌트에서 사용할 훅
// useMemo를 이용해 복잡한 초기 상태값을 캐시에 저장하고 사용하며, useState 함수를 호출할 때마다 시스템이 초기 상태값을 분석할 필요가 없어진다.
export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
```

<br />
<br />

> 2. `_app.js` 내 컴포넌트에 Redux 적용

```js
// _app.js 파일을 수정해서 Nest.js 앱의 모든 컴포넌트가 Redux에 접근 할 수 있도록 수정
import { Provider } from "react-redux";
import { useStore } from "../redux/store";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
```

<br />
<br />

> 3. 컴포넌트에서 Redux 관련 훅 사용 - 끝

```jsx
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import data from "../data/items";

function useGlobalItems() {
  return useSelector((state) => state, shallowEqual);
}

function ProductCart({ id, name, price, picture }) {
  const dispatch = useDispatch();
  const items = useGlobalItems();

  const amounts = Object.keys(items).map((id) => {
    const item = getFullItem(id);
    return { item, amount: items[id] };
  });

  return (
    <div>
      <button onClick={() => dispatch({ type: "DECREMENT", id })}> 버튼</button>
      <button onClick={() => dispatch({ type: "INCREMENT", id })}> 버튼</button>
    </div>
  );
}
```

<br />
<br />
<br />

# CSS 내장 스타일링 메서드

<br />

## Nest.js에서 기본으로 제공하는 스타일링 기법 `Styled JSX`

- `Styled JSX`는 내장 기능이기 때문에 따로 패키지를 설치할 필요가 없다.

<br />

> 새로운 스타일링 언어를 배우지 않고 자바스크립트와 CSS 규칙을 함께 사용하고 싶다면 Styled JSX가 좋은 선택이다.

> Sytled JSX는 CSS-in-JS 라이브러리, 즉 CSS 속성 지정을 위해 자바스크립트를 사용할 수 있는 라이브러리 이다.

<br />
<br />

---

> `Styled JSX의 예제 (1)`

```jsx
// 일반적인 button이라는 클래스 이름을 사용하기 때문에 같은 클래스 이름을 사용하는 다른 컴포넌트와 출동 날 거 같지만, 충돌 나지 않는다.
// 선언한 css 규칙이 다른 컴포넌트에 영향을 주거나 충돌을 일으키지 않는다.
export default function Button(props) {
  return (
    <>
      <button>버튼</button>
      <style jsx>{`
        .button {
          padding: 1em;
          color: white;
        }
      `}</style>
    </>
  );
}

//다음과 같은 FancyButton 컴포넌트를 만들고 똑같은 클래스 이름을 만들어도 Styled JSX 덕분에 정의한 Button 컴포넌트의 스타일을 덮어쓰지 않는다.
export default function FancyButton(props) {
  return (
    <>
      <button>버튼</button>
      <style jsx>{`
        .button {
          padding: 2em;
          color: black;
        }
      `}</style>
    </>
  );
}
```

<br />
<br />

> `Styled JSX의 예제 (2)` 클래스를 따로 지정하지 않고 전체 컴포넌트에 스타일 적용

```js
//클래스를 따로 지정하지 않고 전체 컴포넌트에 스타일 적용 예시
//다른 페이지의 span 요소에는 영향을 주지 않는다.
export default function Highlight(props) {
  return (
    <>
      <span>{props.text}</span>
      <style jsx>{`
        span {
          background: yellow;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
```

<br />
<br />

> `Styled JSX의 예제 (3)` 모든 컴포넌트에 적용할 CSS 규칙을 만들고 싶다면 (GLOBAL)

- 모든 컴포넌트에 적용할 css 규칙을 만들고 싶다면 `global` 속성을 지정하면 된다.
  - Styled JSX는 셀렉터에 해당하는 모든 HTML 요소에 해당 규칙을 적용한다.

```js
// 스타일을 정의할 때 `global` 속성을 지정했기 때문에 span 요소를 사용하면 Highlight 컴포넌트 안에 정의한 스타일 상속받는다.
export default function Highlight(props) {
  return (
    <>
      <span>{props.text}</span>
      <style jsx>{`
        span {
          background: yellow;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
```

<br />
<br />

## SASS를 이용한 스타일링

- 패키지 설치
  - /styles/Home.module.css -> styles/Home.module.scss로 변경
  - SCSS 문법 사용 준비 끝
  - `SASS` , `SCSS` 문법 덕분에 코드를 훨씬 잘 모듈화하고 쉽게 유지 보수할 수 있는 다양한 기능 사용 가능

<br />

```bash
$ yarn add sass
```

<br />
<br />

> CSS Module 예시

```css
.button-default {
  padding: 5px;
  border: none;
  order-radius: 5px;
}

.button-success {
  # composes는 상속
  composes: button-default;
  background-color: green;
}

.button-danger {
  # composes는 상속
  composes: button-default;
  background-color: red;
}
```

<br />

> SCSS 예시

```scss
.button-default {
  padding: 5px;
  border: none;
  order-radius: 5px;
}

.button-success {
  # extend는 상속
  @extend .button-default;
  background-color: green;
}

.button-danger {
  # extend는 상속
  @extend .button-default;
  background-color: red;
}
```
