🎯💡🔥📌✅👎👍

# `아이템38 any 타입은 가능한 한 좁은 범위에 사용하기`

<br />
<br />

```
🔥 요약

✅ 의도치 않은 타입 안전성의 손실을 피하기 위해서 any의 사용범위를 최소한으로 좁혀야 한다.

✅ 함수의 반환 타입이 any인 경우 타입 안전성이 나빠진다. 따라서 any 타입을 반환하면 절대 안된다.

✅ 강제로 타입 오류를 제거하려면, any 대신 @ts-ignore 사용하는 것이 좋다.
```

<br />
<br />

```ts
function processBar(b: Bar) {
  /*...*/
}

function f() {
  const x = expressionReturnFoo();
  processBar(x);
  // ~ 'Foo'형식의 인수에는 `Bar` 형식의 매개변수에 할당될 수 없습니다.
}

// 👎👎
function f1() {
  const x: any = expressionReturnFoo();
  processBar(x);
}

//👍👍
// any타입이 processBar 함수의 매개변수에서만 사용된 표현식이므로 다른 코드에 형향을 미치지 않기 때문이다.
// any의 사용범위를 좁게 제한한는 f2 함수를 사용한다면, any타입이 함수 바깟으로 영향을 미치지 않는다.
function f1() {
  const x = expressionReturnFoo();
  processBar(x as any);
}
```

- `@ts-ignore`를 사용한다면, 다음 줄의 타입에러를 무시할 수 있다.

<br />
<br />

- 객체와 관련된 any의 사용법

> 관련 예시

```ts
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
    //~~~`foo` 속성이 `Foo` 타입에 필요하지만 `Bar` 타입에는 없습니다.
  },
};
```

<br />
<br />

> 큰 객체 안의 한 개 속성이 타입 오류를 가지는 상황

```ts
// 👎👎
// 전체를 any로 선언하는 것은  a,b의 타입을 체크할 수 없다.
const config: Config = {
  a: 1,
  b: {
    key: value,
  },
} as any;

//👍👍
// 다음 코드 처럼 최소한의 범위에서만 any를 사용 해야 한다.
const correctConfig: Config = {
  a: 1,
  b: {
    key: value as any,
  },
};
```

<br />
<br />
<br />
<br />
<br />
<br />

🎯💡🔥📌✅👎👍

# `아이템38 any 타입은 가능한 한 좁은 범위에 사용하기`

<br />
<br />

```
🔥 요약 🔥

✅ any를 사용할 땐 정말로 모든 값이 허용되어야만 하는지 면밀히 검토 해야 한다.

✅ any보다 더 정확하게 모델링할 수 있도록 any[] 또는 {[id:string]: any} 또는 () => any 처럼 구체적인 형태를 사용해야 합니다.
```

<br />
<br />

- `any는 자바스크립트에서 표현할 수 있는 모든 값을 아우르는 매우 큰 범위의 타입이다.`
  - 모든 숫자, 문자열, 배열, 객체, 정규식, 함수, 클래스, DOM엘레먼드, NULL, undefined까지 포함된다.
  - 일반적인 상황에서 any보다 구체적으로 표현할 수 있는 타입이 존재할 가능성이 크기 때문에 `구체적인 타입을 찾아 사용해야한다`.

<br />

> 예시 코드

```ts
//👎👎
// any타입의 값을 그대로 정규식이나 함수에는 넣는 것은 권장되지 않는다.
function getLengthBad(array: any) {
  return array.length;
}
//👍👍
// 위 함수보다 좋은 이유
// 1. 함수내 array.length타입이 체크됩니다.
// 2. 함수의 반환 타입이 any 대신 number로 추론됩니다.
// 3. 함수 호출될 때 매개변수가 배열인지 체크됩니다.
function getLength(array: any[]) {
  return array.length;
}
```

- 함수의 매개변수를 구체화할 때 배열의 배열 형태하면
  - `any[][]` 처럼 선언해서 사용
- 함수의 매개변수가 객체이지만, 값을 알 수 없다면
  - `{[key:string]:any}` 처럼 선언해서 사용

<br />
<br />

> 함수의 매개변수가 객체지만 객체의 값을 알수 없을때 `{[key:string]:any}`

```ts
function hasTwelveLetterKey(o: { [key: string]: any }) {
  for (const key in o) {
    if (key.length === 12) return true;
  }
  return false;
}
```

<br />
<br />

## 함수의 타입에도 단순히 any를 사용하면 안되며, 최소한으로나마 구체화할 수 있는 세가지 방법이 있다.

```ts
//매개 변수 없이 호출 가능한 함수
type Fn0 = () => any;
//매개 변수가 하나
type Fn1 = (arg: any) => any;
//모든 개수의 매개변수
type FnN = (...args:any[]) = >any;


//👎👎
const numArgsBad = (...args:any) => args.length; //any를 반환합니다.
const numArgsGood = (...args:any[]) => args.length;//number를 반환합니다.
```
