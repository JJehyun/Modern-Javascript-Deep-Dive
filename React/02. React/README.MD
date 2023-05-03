# Immer (불변성 유지) 🎯💡🔥📌✅

- `Immer 라이브러리를 이용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있다.`

<br />

- produce : 두가지 파라미터를 받는다.
  - `originalState` : 수정하고 싶은 상태
  - `draft` : 상태를 어떻게 업데이트할지 정의하는 함수

<br />

> 사용 예시

```js
import produce from "immer";
//originalState : 수정하고 싶은 상태
//draft : 상태를 어떻게 업데이트할지 정의하는 함수
//두번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면,produce 함수가 불변성 유지를 대신해주면서 새로운 상태를 생성한다.
const nextState = produce((originalState, draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

<br />
<br />

- `useState 함수형 업데이트` 와 `immer` 함께 쓰기

- `immer를 사용하면`, 배열의 직접적인 변화를 일으키는 `push`,`splice`등의 함수를 사용해도 무방하다.

```
💡 useState 함수형 업데이트란?
  새로운 상태를 파라미터로 넣지 않고 `상태 업데이트를 어떻게 할 지 정의해주는 업데이트 함수`를 넣어주는 것

produce 함수의 파라미터를 함수 형태로 사용하면 가독성이 향상된다.
```

> immer 예시

```js
import React, { useRef, useCallback, useState } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });
  // input 수정을 위한 함수
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    //immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면, 업데이트 함수를 반환.
    setForm(
      produce((draft) => {
        //원본 배열에 직접적인 변화
        draft[name] = value;
      })
    );
  }, []);

  // form 등록을 위한 함수
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    //immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면, 업데이트 함수를 반환.
    setData(
      produce((draft) => {
        //원본 배열에 직접적인 변화
        draft.array.push(info);
      })
    );
  }, []);
};
```

<br />
<br />

# Route

- `Route`
  - `useParams()` : URL 파라미터를 가져오는 hook
  - `useLocation()` : 현재 사용자가 보고 있는 페이지의 정보를 가져온다.
    - `pathname` : 현재 주소의 경로
    - `search` : 맨 앞의 ? 문자를 포함한 쿼리 스트링 값
    - `hash` : 주소의 # 문자열 뒤의 값
    - `state` : 페이지로 이동할 때 임의로 넣을 수 있는 값
    - `key` : location 객체의 고유값, 초기에는 default이며, 페이지가 변경될 때마다 고유의 값이 생성된다.

<br />
<br />

> 예시

```jsx
<Routes>
  <Route path="주소" element={보여줄컴포넌트} />
  {/*유동 url 파리미터*/}
  <Route path="/:name" element={보여줄컴포넌트} />
  <Route path="/:name/:profile" element={보여줄컴포넌트} />
  {/*페이지를 새로 불러오는 것을 막고 History API를 통해 브라우저 주소의 경로 변경*/}
  <Link to="경로">링크 이름</Link>
</Routes>
```

<br />
<br />

## useSearchParams 쿼리 스트링 다루기 (1)

- `useSearchParams`는 배열 타입의 값을 반환한다.
  - `첫번째 원소` : 쿼리파라미터를 `조회`하거나 `수정`하는 메서드들이 담긴 객체를 반환한다.
  - `두번째 원소` : 쿼리파라미터를 `객체 형태`로 업데이트할 수 있는 함수를 반환한다.

<br />

```jsx
import { useSearchParams } from "react-router-dom";
//localhost:3000/about?detail=true&mode=1
const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //true
  const detail = searchParams.get("detail");
  //1
  const mode = searchParams.get("mode");

  const onIncreaseMode = () => {
    setSearchParams({ mode, detail: detail === "true" ? false : true });
  };
};
```

<br />
<br />

## useNavigation (2)

- Link 컴포넌트를 사용하지 않고, 다른 페이지로 이동 해야하는 상황에 사용
  - navigate
    - `replace` : `페이지를 이동 할 때 현재 페이지를 페이지 기록에 남기지 않는다.`

<br />

> 예시

```js
import { useNavigation } from "react-router-dom";

const Layout = () => {
  const navigation = useNavigation();

  const goBack = () => {
    //이전 페이지로 이동
    navigation(-1);
  };
  const goNext = () => {
    navigate("/", { replace: true });
  };
};
```

<br />
<br />

## NavLink (3)

- 링크에서 사용하는 경로가 `현재 라우트의 경로와 일차하는 경우` `특정 스타일` 또는 `CSS클래스`를 적용하는 컴포넌트이다.

```js
import { NavLink } from "react-router-dom";

const App = () => {
  const active = {
    color: "green",
    fontSize: 21,
  };

  return (
    <>
      <NavLink
        to="/start/1"
        style={({ isActive }) => (isActive ? active : undefined)}
      >
        다음1
      </NavLink>
      <NavLink
        to="/start/2"
        style={({ isActive }) => (isActive ? active : undefined)}
      >
        다음2
      </NavLink>
    </>
  );
};
```

<br />
<br />

## NotFound 페이지 만들기 (4)

- `사전에 정의되지 않는 경로에 사용자가 진입했을때 보여주는 페이지`
- `*` 라우터는 라우트 엘리먼트의 `상단에 위치하는 라우트들의 규칙을 모두 확인`하고, `일치하는 라우트가 없다면` 화면에 나타내게 된다.

<br />

> 사용 예시

```jsx
import { Route, Routes } from "react-route-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={보여줄컴포넌트}>
        <Route path="/detail" element={보여줄컴포넌트} />
      </Route>
      <Route path="*" element={404} />
    </Routes>
  );
};
```

<br />
<br />

## Navigate 컴포넌트 (5)

- `컴포넌트를 보여주는 순간 다른 페이지로 이동하고 싶을 때 사용하는 컴포넌트`
- 즉, `리다리엑션`할 때 사용

<br />
<br />

```jsx
import { Navigate } from "react-route-dom";

const Mypage = () => {
  //로그인이 되어 있지 않다면, 로그인 페이지로 리다이렉션
  //replace는 페이지 기록을 남기지 않는 설정
  if(!isLoggedIn) <Navigate to='login' replace={true}>
}
```

<br />
<br />
<br />

# Context API

- `전역 관리 API`

<br />

> 1. 새 Context 생성

```js
// /src/contexts/color.js
import { createContext } from "react";

export default const ColorContext = createContext({ color: "black" });
```

<br />

## `Consumer 사용하기 (1)`

```js
import ColorContext from "../contexts/color";

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => <div style={{ background: value.color }} />}
    </ColorContext.Consumer>
  );
};
```

```js
//💡 Render Props 예제
// Render Props : 컴포넌트의 children이 있어야 할 자리에 일반 JSX혹은 문자열이 아닌 함수를 전달

export default const RenderPropsSample = ({ children }) => {
  return <div>결과: {children(5)}</div>;
};

//만약 위와 같은 컴포넌트가 있다면 추후 사용할 때 다음과 같이 사용가능
<RenderPropSample>{value => 2 * value}</RenderPropSample>
```

<br />
<br />
<br />

## `Provider 사용하기 (2)`

- `Provider를 사용하면, Context의 Value를 변경할 수 있다.`

```jsx
// /src/contexts/color.js
import { createContext } from "react";
export default const ColorContext = createContext({ color: "black" });


//App.js
import ColorContext from "../contexts/color";

const App = () => {
  return (
    // Provider를 사용할 땐 value값을 명시 해야 에러가 나지 않는다.
    <ColorContext.Provider value={{ color: "red" }}>
      <ColorBox />
    </ColorContext.Provider>
  );
};
```

<br />
<br />

---

<br />
<br />

## 동적 Context 사용하기 새 예시

> 1. Context 생성

```js
import React, { createContext, useState } from "react";

//state값
const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

//Provider
const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

// const ColorConsumer = ColorContext.Consumer과 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;
```

<br />

> 2. APP컴포넌트 Provider로 묶기 , state 조회

```jsx
//App.js
import { ColorProvider } from "./contexts/color";

const App = () => {
  return (
    <ColorProvider>
      <ColorBox />
    </ColorProvider>
  );
};

//ColorBox.js
import { ColorConsumer } from "../contexts/color";
import React, { useContext } from "react";

const ColorBox = () => {
  //useContext훅 state 조회
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          background: state.color,
        }}
      />
      <div
        style={{
          background: state.subcolor,
        }}
      />
    </>
  );
};
```

<br />

> 3. state 변경

```js
import React, { Component } from "react";
import ColorContext from "../contexts/color";

export default const SelectColors = () => {
  return(
    <>
      {/*state,action*/}
      <ColorContext>
        {({actions}) => (
          <div onClick={()=>{actions.setColor('red')}}/>
        )}
      </ColorContext>
    </>
  )
}
```

---

<br />
<br />
<br />
<br />
<br />
<br />

---

# Redux 사용하기

- `action` : Redux에서 관리하고 있는 state에 접근하기 위해 `dispatch`로 `action 객체`를 `전달`
- `reducer` : `action을 dispatch하면 reducer 함수가 호출된다.`

```
Ducks 패턴 예시
 - modules/
   - counter.js
   - todos.js
```

<br />
<br />

## `(1) Redux 환경 세팅`

> 1.  액션 타입 , 리듀서 정의 하기 예제

- `createAction` : 매번 객체를 만들 필요없이 간단하게 액션 생성함수를 생성할 수 있다.
- `handleActions`

```js
// modules.counter.js
// ex) 모듈이름/액션이름
import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// dispatch에 필요한 함수들
// 액션 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//초기 상태
const initialState = {
  number: 0,
};

//리듀서
// handleActions(각 액션에 대한 업데이트 함수, 초기 상태)
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
```

<br />
<br />

> 2. 루트 리듀서 만들기

```js
// 스토어를 만들 때는 리듀서를 하나만 사용 해야 한다.
// 기존에 만든 리듀서를 합치기
// modules/index.js
import { combineReducer } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducer({
  counter,
  todos,
});
```

<br />
<br />

> 3. 스토어 및 Provider 컴포넌트 사용

```js
// 스토어 만들기
import rootReducer from "./modules";
import { createStore } from "redux";
import { Provider} from 'react-redux';

const store = createStore(rootReducer);
return (
<Provider store={store}>
  <App />
<Provider>
)
```

---

<br />
<br />

## (2) `리덕스 상태 조회하기` (상태 조회)

- `useSelector`로 상태 조회
  - useSelector로 리덕스 상태를 조회했을때는 최적화 적업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서는 `React.memo`를 컨테이너 컴포넌트에 사용 해야 한다.

> 예시

```js
// modules.counter.js 참고
const 결과 = useSelector(상태 선택 함수)

const number = useSelector(state => state.counter.number);
```

<br />
<br />

## (3) `useDispatch를 이용해서 액션 디스패치` (상태 변경)

- `useDispatch` : 컴포넌트 내부에서 스토어 내장함수 dispatch를 사용할 수 있게 해준다.
  - 컴포넌트를 디스패치해야한다면 이 HOOK를 사용하면 된다.

> 예시

```js
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "../modules/counter";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  //숫자가 바뀔때 마다 onIcrease, onDecrease함수가 새롭게 만들어 지고 있다.
  //성능 최적화를 위해 useCallback으로 묶어준다.
  const onIcrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter
      number={number}
      onIcrease={() => {
        dispatch(increase());
      }}
      onDecrease={() => {
        dispatch(decrease());
      }}
    />
  );
};
```

<br />
<br />

```js
📌 번외 - useActions 유틸 hook 만들어서 사용
  - useActions를 이용하면 여러 개의 액션을 사용해야하는 경우 코드를 훨씬 깔끔하게 정리 하여 사용 가능
  - 액션 생성 함수를 액션을 디스패치하는 함수로 변환해준다.
  - 액션 생성함수를 사용해서 액션 객체를 만들고, 이를 스토어에 디스패치하는 작업을 해주는 함수를 자동으로 만들어준다.
// src/lib/useActions.js
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : deps
  );
}

// 사용
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />)
```

---

<br />
<br />
<br />
<br />
<br />
<br />

---

# Redux 미들웨어를 통해 비동기 작업 처리

<br />

- 리덕스 미들웨어는 액션을 `디스패치했을 때`, 리듀서에서 이를 처리하기에 `앞서 사전에 지정된 작업`을 `실행`하는 것

  - 미들웨어는 결국 `함수를 반환하는 함수를 반환하는 함수`이다.
  - `store` : 리덕스 스토어 인스턴스, action은 디스패치된 액션을 가르킨다.
  - `next` : `그 다음 처리해야 할 미들웨어에게 액션을 넘겨준다.`
    - 그다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다.

```
[액션] -> [미들웨어] -> [리듀서] -> [스토어]
```

<br />
<br />

> 미들웨어 구조

```js
// lib/loggerMiddleware.js
const loggerMiddleware = (store) => (next) => (action) => {
  // 미들웨어 기본구조
};

//function 키워드로
const loggerMiddleware = function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      //미들웨어 기본 구조
    };
  };
};
```

<br />
<br />

> 미들웨어 구조

```js
export default const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action && action.type); // 액션 타입으로 log를 그룹화함
  console.log("이전 상태", store.getState());
  console.log("액션", action);
  next(action); //다음 미들웨어 혹은 리듀서에게 전달
  console.log("다음 상태", store.getState); //업데이트된 상태
  console.groupEnd(); //그룹 끝
};

//App.js
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware))
<Provider store={store}>
</Provider>
```

<br />
<br />
<br />
<br />

# 비동기 미들웨어 react-thunk

> 1. 액션,리듀서 정의

```js
import { createAction, handleActions } from "redux-actions";

// 액션 타입들을 선언
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

// 초기 상태를 선언합니다.
// 요청의 로딩중 상태는 loading 이라는 객체에서 관리
const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default sample;
```

<br />

> 2. store 등록

```js
//modules/index.js
import { combineReducers } from "redux";
import counter from "./sample";

const rootReducer = combineReducer({
  counter,
});

//App.js
import { createStore, applyMiddle } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux=thunk";
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));

<Provider store={store}>
  <App />
</Provider>;
```

<br />

> 3. 반복되는 로직 제거

```js
// src/lib/createRequestThunk.js
import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestThunk(type, request) {
  // 성공 및 실패 액션 타입을 정의합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type }); // 시작됨
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); // 에러 발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}
```

<br />

> 4. 로딩만 관리하는 리덕스 모듈

```js
import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

/*
 요청을 위한 액션 타입을 payload 로 설정합니다 (예: "sample/GET_POST")
*/

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
```

<br />
<br />
<br />
<br />

---

# 코드 스플리팅

```
💡 import()함수를 메서드 안에서 사용하며느 파일을 따로 분리시켜 저장한다. 함수가 필요한 시점에 파일을 불러와 사용할 수 있다.

💡 import()함수를 사용하면 Promise를 반환한다. 이 함수를 통해 모듈을 불러올때 모듈에서 default로 내보낸 것은 result.default를 참조 해야 사용할 수 있다.
```

- 코드 스플리팅을 위해 리액트에서 내장된 기능으로 유틸함수인 `React.lazy`와 컴포넌트인 `Suspense`이 있다.
  - `import함수를 통해 불러온다음, 컴포넌트 자체를 state 넣은 방식으로 구현한다.`
  - `React.lazy` : 컴포넌트를 렌더링하는 시점에서 `비동기적으로 로딩할 수 있게 해주는 유틸함수`이다.
  - `Suspense` : 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고, `로딩이 끝나지 않았을때 보여줄 UI 설정 가능` 하다.

<br />
<br />
<br />

```js
//상단에서 import하면, notify코드가 main안으로 들어가게 된다.
import notify from "./notify";

function App() {
  const onClick = () => {
    notify();
  };
}
return (
  <>
    <p onClick={onClick}>qq</p>
  </>
);

//import() 함수 형태로 메서드 안에서 사용하면 파일을 따로 분리 시켜 저장한다.
//실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있다.
import notify from "./notify";

function App() {
  const onClick = () => {
    import("./notify").then((result) => result.default());
  };
}
return (
  <>
    <p onClick={onClick}>qq</p>
  </>
);
```

<br />
<br />
<br />

## Loadable Components를 통한 코드 스플리팅

- `Loadable Components` : 코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리이다.
  - 렌더링 전에 필요할 때 스플리팅된 파일을 미리 불러올 수도 있다.
  - React.lazy와 사용법이 비슷하고, Suspense를 사용할 필요는 없다.

<br />

> Loadable Components 코드 스플리팅 예시

```js
import loadable from "@loadable/component";
//로딩 중에 다른 컴포넌트 보여주기
const SplitMe = loadble(() => import("./Splite"), {
  fallback: <div>Loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return <div>{visible && <SplitMe />}</div>;
}
```

<br />

> Loadable Components preload 예시

```js
import loadable from "@loadable/component";
//로딩 중에 다른 컴포넌트 보여주기
const SplitMe = loadble(() => import("./Splite"), {
  fallback: <div>Loading...</div>,
});
//컴포넌트 미리 불러오기
const onMouseOver = () => {
  SplitMe.preload();
};
function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return <div onMouseOver={onMouseOver}>{visible && <SplitMe />}</div>;
}
```
