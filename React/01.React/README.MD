# React 조건부 연산자 🎯💡🔥📌✅

> JSX 내부의 자바스크립트 표현식에는 `IF문을 사용할 수 없다.`

<br />

## 1. `삼항 연산자` 이용한 조건부 렌더링

```js
function App() {
  return <>{name === "react" ? <div> react </div> : <>Not</>}</>;
}
```

<br />

## 2. AND 연산자를 이용한 조건부 렌더링

```JSX
// && 연산자로 조건부 렌더링 할 수 있는 이유는 리액트에서 false를 렌더링할 때
function App() {
  return <>{name === "react" && <div> react </div>}</>;
}
```

<br />

## 3. undefined일 때 조건부 렌더링

```jsx
function App() {
  const name = undefined;
  return <div>{name || "react"}</div>;
}
```

<br />
<br />
<br />

---

## `태그 사이의 내용을 보여주는 children` 와 `defaultProps`

<br />

- 리액트 컴포넌트를 사용할 때 컴포넌트 `태그 사이`의 `내용`을 보여주는 props가 `children`
- `defaultProps`

```js
//App 컴포넌트
import Mycomponent from "./MyComponent";
const App = () => {
  return <MyComponent>react </MyComponent>;
};

//Mycomponent
const MyComponent = props => {
  return {
    {/*react 출력*/}
    <div>{props.children}</div>
    {/*기본 이름 출력*/}
    <div>{props.name}</div>
  }
}
MyComponent.defaultProps = {
  name:'기본 이름'
}
```

<br />
<br />

## 비구조화 할당 문법을 이용해 props 내부 값 추출하기

<br />

- props 값을 조회할 때 마다 props.name,props.children과 같이 props 키워드를 붙이지 않고 내부 값을 바로 추출하는 방법

<br />

> 비구조화 할당 문법 예시

```js
//Mycomponent 첫번째 방법
const MyComponent = props => {
  const {name , children} = props;
  return {
    <div>{children}</div>
    <div>{name}</div>
  }
}

//Mycomponent 두번째 방법
const MyComponent = ({name,children}) => {
  return {
    <div>{children}</div>
    <div>{name}</div>
  }
}
MyComponent.defaultProps = {
  name:'기본 이름'
}
```

<br />
<br />

---

# State

```
📌 State란 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다.

- props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이며, 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용 할 수 있다. props를 바꾸려면 부모 컴포넌트에서 바꾸어야 한다.


📌 배열의 비구조화 할당
- const array = [1,2];
- const [one, two] = array;
```

<br />
<br />

> usestate를 이용한 에시 style 변경

```js
import React, { useState } from "react";

const Say = () => {
  const [color, setColor] = useState("");
  return (
    <>
      <h1 style={{ color }}>텍스트</h1>
      <button onClick={() => setColor("red")}>빨간색</button>
      <button onClick={() => setColor("green")}>초록색</button>
    </>
  );
};
```

<br />
<br />

```
📌 State를 사용할 때 주의사항

- state값을 변경할 때는 setState 혹은 useState를 통해 전달 받은 세터 함수를 사용해야한다.
- 객체,배열에서 업데이트 할때는 spreed 연산자를 통해 사본을 만들고 그 사본에 값을 업데이트 한 후, 그사본의 상태를 setState를 통해 업데이트 해야한다.

```

<br />
<br />
<br />

# React Map

> 자바스크립트 배열 객체의 내장 함수인 map를 이용해서 반복되는 컴포넌트를 렌더링할 수 있다. <br />
> map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성한다.

<br />

```js
// 문법 예시
arr.map(callback, [thisArg]);
callback -> 새로운 배열의 요소를 생헝하는 함수로 파라미터는 다음 세가지이다.
  - currentValue : 현재 처리하고 있는 요소
  - index : 현재 처리하고 있는 요소
  - array : 현재 처리하고 있는 원본 배열
thisAay : callback 함수 내부에서 사용할 this 레퍼런스

//key
리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다.
예를 들어 유동적인 데이터를 다룰때는 원소를 새로 생성할 수도, 제거 할 수도, 수정할 수도 있다.
key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.
하지만, key가 있다면 이값을 사용하여 어떤 변화가 일어났는지 빠르게 알아낼 수 있다.
```

<br />
<br />

> map를 이용해서 렌더링 예시

```js
const IterationSample = () => {
  const names = ["one", "two", "three"];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>;
};
```

<br />
<br />

```
💡 고유한값이 없을 때만 index값을 key로 사용해야 한다.
- index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다.

💡 push함수는 기존 배열 자체를 변경, concat은 새로운 배열을 만들어준다.
- 불변성을 유지해야 나중에 리액트 컴포넌트의 성능을 최적화 할 수 있다.
```

<br />
<br />

---

> map 함수 + useState + css 상태 변경

```tsx
interface Component {
  name: string;
  isActive: boolean;
}
const components: Component[] = [
  { name: "최근 본 영상", isActive: true },
  { name: "최근 본 아이템", isActive: false },
  { name: "좋아한 콘텐츠", isActive: false },
];

<div className="flex gap-2 pr-[20px] pl-[20px] pt-[20px]">
  {components.map((component, index) => (
    <div
      key={component.name}
      className={`flex h-[35px] items-center justify-center rounded-[500px] bg-[#7C61FF] p-4 ${
        activeIndex === index
          ? "bg-[#7C61FF] font-medium text-white"
          : "bg-[#F7F8FA] font-normal"
      }`}
      onClick={() => handleClick(index)}
    >
      {component.name}
    </div>
    })
</div>;
```

<br />
<br />

# Hooks 정리

<br />

## (1) `useState`

> 가장 기본적인 Hook이며, 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.

<br />

```js
import React, { useState } from "react";

const Counter = () => {
  //카운터의 기본값을 0으로 설정
  //첫번째 배열은 원소의 상태값 (value)
  //두번째 배열은 상태를 설정하는 함수(setValue)
  const [value, setValue] = useState(0);
  return (
    <>
      <div>{value}</div>
      <button
        onClick={() =>
          setValue(value + 1);
        }
      >
        +1
      </button>
            <button
        onClick={() =>
          setValue(value - 1);
        }
      >
        -1
      </button>
    </>
  );
};
```

<br />
<br />
<br />

## (2) `useEffect`

- 리액트 컴포넌트가 `렌더링될 때마다 특정 작업을 수행`하도록 설정할 수 있는 Hook이다.
- `componentDidMount`, `componentDidUpdate`를 합친 형태이다.

<br />

> 마운트될 때만 실행하고 싶을 때

```js
//마운트될 때만 실행 된다.
useEffect(() => {}, []);
```

<br />

> 특정 값이 업데이트될 때만 실행하고 싶을 때

```js
//useEffect의 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어준다.
useEffect(() => {
  console.log(name);
}, [name]);
```

<br />

> 뒷정리하기

- 컴포넌트가 `언마운트되기 전`이나 `업데이트되기 직전`에 어떠한 작업을 수행하고 싶다면 `useEffect`에서 `cleanup` 함수를 반환 해주어야 한다.

```js
//useEffect는 기본적으로 렌더링되고 난 직후 마다 실행되며, 두 번째 파라미터 배열에 무얼을 넣는지에 따라 실행되는 조건이 달라진다.
useEffect(() => {
  //컴포넌트가 나타날 때 'effect'
  console.log("effect");
  return () => {
    //컴포넌트가 사라질 때 'cleanup'
    //업데이트되기 직전의 값을 보여준다.
    console.log("cleanup");
  };
}, [name]);
```

<br />

> 오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면

```js
// 오직 언마운트 될 때만 뒷정리 함수를 호출하고 싶다면 useEffect함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 된다.
useEffect(() => {
  console.log("effect");
  return () => {
    console.log("unmount");
  };
}, []);
```

<br />
<br />
<br />

## (3) `useReducer`

> 리듀서는 `현재 상태`, 그리고 업데이트를 위해 필요한 정보를 담은 `액션 값`을 전달 받아 `새로운 상태를 반환하는 함수` <br /> `리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 주어야 한다.
`

<br />
<br />

> 리듀서를 이용한 Counter 만들기

```js
import React, { useReducer } from "react";

//리듀서
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREAMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  //첫번째 파라미터에 리듀서 함수를 넣고, 두번째 파라미터에 해당 리듀서의 기본값을 넣어준다.
  //state는 현재 가리키고 있는 상태, dispatch는 액션을 발생 시키는 함수
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return (
    <>
      <div>{value}</div>
      <button onClick={() => setValue(value + 1)}>
        +1
      </button>
      <button onClick={() =>setValue(value - 1);}>
        -1
      </button>
    </>
  )
};
```

<br />

> 리듀서 다른 예시

```js
import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}
const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });
};
const { name, nickname } = state;
const onChange = (e) => {
  dispatch(e.target);
};
return (
  <>
    <input name="name" value={name} onChange={onChange} />
    <input name="nickname" value={nickname} onChange={onChange} />
  </>
);
```

<br />
<br />
<br />

## (4) useMemo,useCallback

<br />

- `useMemo` : 렌더링 하는 과정에서 특정 값이 바뀌었을때만 연산 실행, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식
- `useCallback` : 선언한 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용한다
  - 컴포넌트의 `렌더링`이 `자주 발생`하거나` 렌더링해야할 컴포넌트의 갯수가 많아지면` 이 부분을 `최적화` 하는 것이 좋다.

> useMemo를 사용하면 함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

```js
import React, { useState, useMemo, useRef, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }; // number 혹은 list 가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;


import React, { useState, useMemo, useRef, useCallback } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  const inputEl = useRef(null);

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
    inputEl.current.focus();
  }, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

<br />
<br />
<br />

## (5) Custem Hooks

- 여러 컴포넌트에서 비슷한 기능을 공유할 경우 자신만의 Hook으로 작성하여 로직을 재사용할 수 있다.

<br />

```js
//useInput 커스텀 훅
import { useReducer } from "react";
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}

//커스텀 훅 사용 Info 컴포넌트
const Info = () => {
  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  return (
    <div>
      <input name="name" value={name} onChange={onChange} />
      <input name="nickname" value={nickname} onChange={onChange} />
      <b>이름:</b> {name}
      <b>닉네임: </b> {nickname}
    </div>
  );
};
```

<br />
<br />

## 커스텀 훅 두번째 예시

> 예시코드

```js
import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
  // 로딩중 / 완료 / 실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, deps);

  return [loading, resolved, error];
}
```

<br />
<br />

# styled-component 다루기

> `styled.div` `Tagged` `템플릿 리터럴 문법을 통해 스타일을 넣어 주면`, 해당 스타일이 적용된 div로 이루어진` 리액트 컴포넌트`가 `생성`된다.

<br />
<br />

## 스타일된 엘리먼트 만들기 (1)

> 예시코드

```js
import styled from "styled-components";

const MyCoponent = styled.div`
  font-size: 2rem;
`;

// <MyComponent>Hello</MyComponent> 같은 형식으로 사용 가능하다.
```

<br />

## 스타일된 엘리먼트 만들기 (1 - 1)

> 사용해야할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링해 주고 싶을 때

```js
// 태그의 타입을 style 함수의 인자로 전달
const MyInput = styled("input")`
  background: gray;
`;
// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
  color: blue;
`;
```

<br />

## 스타일에서 props 조회하기 (2)

<br />

> styled-components를 사용하면 스타일 컴포넌트에게 전달된 props 값을 참조할 수 있다.

```js
<Box color="black">박스 </Box>;

const Box = styled.div`
  background: ${(props) => props.color || "blue"};
`;
```

<br />

## props에 따른 조건부 스타일링 (3)

> 예시

```js
//컴포넌트 사용
<Button inverted={true}> 버튼 </Button>;

const Button = styled.button`
  background: white;
  color: black;
  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;
```

<br />

## styled-component를 이용한 반응형 디자인 (4)

> styled-components + media 쿼리 예시

```js
const Box = styled.div`
  background: ${(props) => props.color || "blue"};
  /*기본적으로 가로크기 1024px에 가운데 정렬을 하고 
  * 카로 크기가 작아짐에 따라 크기를 줄이고
  * 768px 미안이 되면 꽉 채움
  */
  width: 1024px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
```

<br />
<br />
<br />
<br />

---

## Todo

<br />
<br />

```
🔥 컴포넌트는 다음과 같은 상황에서 리렌더링이 발생한다.

- 1.자신이 전달받은 props가 변경될 때
- 2.자신의 state가 바뀔 때
- 3.부모의 컴포넌트가 리렌더링될 때
- 4.forceUpdate 함수가 실행될 때

🔥 성능 최적화

- React.memo : 컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정
- useState의 함수형 업데이트 : 새로운 상태를 파라미터로 넣지 않고 `상태 업데이트를 어떻게 할 지 정의해주는 업데이트 함수`를 넣어준다.
  - useCallback(id => setTodo(todos => todos.concat(todo),[]))
- react-virtualized 라이브러리 사용 : 리스트 컴포넌트에서 스크롤되기 전의 컴포넌트는 렌더링하지 않고 크기만 차지

```

<br />
<br />

- `Insert`

> todos 배열에 새 객체를 추가하기

```js
const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "one" },
    { id: 2, text: "two" },
  ]);
};

//고유값으로 사용될 id
//ref를 사용하여 변수 담기
//값은 화면에 보이지도 않고 리렌더링 될 필요없기 때문에 useRef를 사용한다.
const nextId = useRef(4);

// 컴포넌트 성능을 아낄 수 있도록 useCallback 사용
// props로 전달할 함수를 만들 때는 useCallback을 사용하는 것이 좋다.
const onInsert = useCallback(
  (text) => {
    const todo = { id: nextId.current, text };
    setTodo(todos.concat(todo));
    nextId.current += 1;
  },
  [todos]
);

return <>...</>;
```

<br />

- `Delete`

```
💡 filter 함수

- const array = [1, 2, 3, 4, 5,6 ,7 ,8 ,9 ,10];
- const biggerThanFive = array.filter(number => number > 5);
/// [6,7,8,9,10]
```

> todos 배열에서 객체 삭제

```js
const [todos, setTodos] = useState([
  { id: 1, text: "one" },
  { id: 2, text: "two" },
]);

const onRemove = useCallback(
  (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  },
  [todos]
);
```

<br />

- `update`

> todo 수정 기능

```js
const [todos, setTodos] = useState([
  { id: 1, text: "one", checked: true },
  { id: 2, text: "two", checked: false },
]);

const onToggle = useCallback((id) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, checkde: !todo.checked } : todo
    )
  );
});
```
