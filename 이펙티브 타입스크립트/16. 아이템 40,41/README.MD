🎯💡🔥📌✅👎👍

# `아이템40 함수 안으로 타입 단언문 감추기`

- 함수를 작성하다보면, 외부로 드러난 타입 정의는 간단하지만, 내부 로직이 복잡해서 안전한 타입으로 구현하기 어려운 경우가 많다.
  - `불필요한 예외 상황까지 고려해가며 타입 정보를 힘들게 구성할 필요는 없다.`
  - `함수 내부`에는 `타입 단언`을 사용하고 `함수 외부`로 드러나는 `타입 정의를 정확히` 명시하는 정도가 좋다.

<BR />
<BR />

> 예시

```ts
//안에서 예시로 cacheLast라는 함수를 가져와서 다음과 같이 내부에 단언문을 사용하였지만 호출하는 쪽에서 그것을 알지 못하기 때문에 괜찮다고 설명한다.
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}
```

<br />
<br />

🎯💡🔥📌✅👎👍

# `아이템41 any의 진화를 이해하기`

<br />
<br />

```
🔥요약🔥

✅일반적인 타입들은 정제되기만 하는 반면, 암시적 any와 any[] 타입은 진화 할 수 있다.

✅any를 진화시키는 방식보다 명시적 타입 구문을 사용하는 것이 안전한 타입을 유지하는 방법이다.
```

- 타입스크립트에서 일반적으로 변수의 타입은 변수를 선언할 때 결정된다.
  - 새로운 값이 추가되도록 확장할 수는 없다.
  - 그러나, `any 타입과 관련해서 예외인 경우가 있다.`

<br />
<br />

> out의 타입이 진화하는 과정

```ts
const range = (start: number, limit: number) => {
  const out = []; // 타입이 any
  for (let i = start; i < limit; i++) {
    out.push(i); // out의 타입이 any[]
  }
  return out; // 타입이 number[]
};
//처음에는 any 타입 배열인 []로 초기화되었는데, 마지막에는 number[]로 추론되고 있다.
// out의 타입은any[]로 선언되었지만, number 타입을 넣는 순간 부터 타입은 number[]로 진화되었다.
```

<br />
<br />

## 태열에 다양한 타입의 요소를 넣으면 배열의 타입이 확장되며, 진화한다

> 예시 코드

```ts
const result = []; //타입이 any[]
result.push("a");
result; //타입이 string[]
result.push(1);
result; //타입이 number[]
```

<br />
<br />

## 조건문에서 분기에 따라 타입이 변할 수도 있다.

> 배열이 아닌 단순값 예시

```ts
let val: any;
if (Math.random() < 0.5) {
  val = /hello/;
  val; // 타입이 RegExp
} else {
  val = 12;
  val; // 타입이 number
}
val; // 타입이 number | RegExp
```

<br />
<br />

## 변수의 초깃값이 null인 경우도 any의 진화가 일어난다.

<br />

- 보통은` try/catch 블록 안에서 변수를 할당하는 경우에 나타난다.`

> 예시 코드

```ts
let val = null; //타입이 any
try {
  somethingDangerous();
  val = 12;
  val; // 타입이 number
} catch (e) {
  console.log("error");
}
val; // 타입은 number | null
```

<br />
<br />

## 명시적으로 any를 선언하면 타입이 그대로 유지된다.

> 예시 코드

```ts
let val: any;
if (Math.random() < 0.5) {
  val = /hello/;
  val; // 타입이 any
} else {
  val = 12;
  val; // 타입이 any
}
val; // 타입이 any
```

- 암시적 any의 경우 `변수에 어떠한 할당도 하지 않고 사용하려고 하면 암시적 any 오류`가 발생하게 된다.
  - `어떤 변수가 암시적 any 상태일때 값을 읽으려고 한다면 오류가 발생 한다.`
  - 타입을 안전하게 지키기 위해서는 암시적 `any를 진화시키는 방식`보다 `명시적 타입 구문을 사용하는 것`이 `더 좋은 설계`이다.

<br />
<br />
<br />
<br />
