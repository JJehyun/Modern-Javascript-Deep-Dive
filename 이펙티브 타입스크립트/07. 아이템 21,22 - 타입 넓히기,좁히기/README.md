# 아이템 21 `타입 넓히기` 🎯💡🔥📌

## 타입스크립트가 작성된 코드를 체크하는 정적 분석 시점에, 변수는 '가능한' 값들의 집합을 가진다.

- `넓히기` : 타입스크립트에서의 과정으로 `지정된 단일 값`을 가지고 `할당 가능한 값들의 집합`을 `유추` 해야한다는 뜻

- 상수를 사용해서 변수를 초기화할 때 타입을 `명시하지 않으면` 타입 체커는 타입을 결정 해야 한다.
  - 즉, 지정된 `단일 값`을 가지고 할당 가능한 집합을 유추해야하는데 이를 `타입 넓히기`라고 한다.

<br />

> 위 예시

```js
interface Vector3 {
  x: number
  y: number
  z: number
}

const getComponent = (vector: Vector3, axis: 'x' | 'y' | 'z') => {
  return vector[axis]
}

let x = 'x' // 타입은 string
let vec = {x:10, y:20, z: 30};

getComponent(vec, x) // 'string' 형식의 인수는 '"x" | "y" | "z"' 형식의 매개 변수에 할당될 수 없습니다.
```

> getComponent함수는 두 번째 매개변수에 `"x" | "y" | "z"` 타입을 기대하지만, x의 타입은 할당 시점에 `string`으로 추론된다.

<br />

> 타입 넓히기가 진행될 때, 주어진 값으로 추론 가능한 타입이 여러 개이기 때문에 과정이 모호하다

<br />
<br />

## 넓히기의 과정을 제어하는 방법

- `const`의 사용
  - 재할당이 `불가능` 하기 때문에 타입스크립트는 좁은 타입으로 추론이 가능하다.
  - 📌 객체의 경우엔 각 요소를 let으로 할당된 거 처럼 다룬다.

<br />

> 예시

```js
const x = "x"; // 타입은 'x'
```

<br />
<br />

## 타입 추론의 강도를 직점 제어하여 타입스크립트의 기본 동작을 제어하는 방법

1. 명지적 타입 구문 제공

```js
//타입은 {x : 1|3|5; }
const v: { x: 1 | 3 | 5 } = { x: 1 };
```

2. 타입 체커에 추가적인 문맥을 제공 (함수의 매개변수로 값을 전달)

3. `const 단언문 제공` (값 뒤에 as `const`를 작성하면 타입스크립트는` 최대한 좁은 타입`을 `추론`한다.)

```js
const v1 = {
  x: 1,
  y: 2,
}; // type : {x: number; y: number;}
const v2 = {
  x: 1 as const,
  y: 2,
}; // type : {x: 1; y: number;}
const v3 = {
  x: 1,
  y: 2,
} as const; // type : {readonly x: 1; readonly y: 2;}
```

<br />
<br />
<br />

# 아이템 22 `타입 좁히기` 🎯💡🔥📌

<br />
<br />

- 타입 넓히기의 반대 -> 타입 좁히기
  - `타입 좁히기란`: 타입스크립트가 `넓은 타입`으로부터 `좁은 타입`으로 진행하는 과정을 말합니다.
  - ex) 일반적인 예시 dom요소를 가져와 null 체크 하는 것

<br />
<br />

> 위 예시 (타입 좁히기의 예제 (1) , HTMLElement | null)

```js
const el = document.getElementById("foo"); // 타입이 HTMLElement | null

if (el) {
  el.innerHTML = "hi";
  // el 타입 HTMLElement
} else {
  alert("No element #foo");
  // el 타입이 null

  // 위 코드에서 el이 null이러면, 분기문의 첫 번째 불록이 실행되지 않는다. 즉 첫 번째 블록에서 null을 제외하므로, 더 좁은 타입이 되어 작업이 훨씬 쉬워진다.
}
```

- `el`가 `null` 일때 분기문의 첫 번째 블록이 실행되지 않음
  - 첫번째 블록에서 `HTMLElement` | `null`의 타입의 `null`를 제외하므로, 더 좁은 타입이 되어 작업이 쉬워진다.
  - 타입 체커는 일반적으로 이러한 조건문에서 타입 좁히기를 잘한다.

<br />
<br />

> 위 예시 (타입 좁히기의 예제 (2) , instance of)

- `instance of`

```js
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    search; // 타입이 RegExp
    return !!search.exec(text);
  }
  search; // 타입이 string
  return text.includes(search);
}
```

<br />
<br />

> 위 예시 (타입 좁히기의 예제 (3))

- 속성 체크로 타입 좁히기

```js
function pickAB(ab: A | B) {
  if ("a" in ab) {
    ab; // 타입이 A
  } else {
    ab; // 타입이 B
  }
  ab; // 타입이 A | B
}
```

<br />
<br />

> 위 예시 (타입 좁히기의 예제 (4) , Array.isArray)

- Array.isArray와 같은 내장 함수

```js
function contains(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms];
  termList; // 타입이 string[]
}
```

<br />
<br />

> 위 예시 (타입 좁히기의 예제 (5), 명시적 타입 붙이기)

```js
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "download";
  filename: string;
}

//--테그된 유니온 패턴, 구변된 유니온--
function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "downlaod":
      e; // 타입이 DownloadEvent
      break;
  case "upload"
      e; //타입이 UploadEvent
      break;
  }
}
```

<br />
<br />

> 위 예시 (타입 좁히기의 예제 (6))

- 사용자 정의 타입 가드를 통한 타입 좁히기

```js
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return "value" in el;
}
function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    el; // type : HTMLInputElement
    return el.value;
  }
  el; // type : HTMLElement
  return el.textContent;
}


```

<br />
<br />

---

## 타입 좁히기의 잘못된 예시

<br />

> 첫 번째 예시

```js
cosnt el = document,getElementById('foo');  // 타입이 HTMLElement | null
if(type of === 'object'){
    el; // 타입이 HTMLElement | null (타입 좁히기X)
}

// type of null 이 "object"이기 때문이다.
```

<br />

> 두 번째 예시

```js
function foo(x?: number | string | null) {
  if (!x) {
    x; // 타입이 string | number | null | undefined
  }
}
//빈 문자열'' 과 0 모두 false가 되가 때문에, 타입은 전혀 좁혀지지 않음
//타입은 여전히 string 또는 number가 된다.
```
