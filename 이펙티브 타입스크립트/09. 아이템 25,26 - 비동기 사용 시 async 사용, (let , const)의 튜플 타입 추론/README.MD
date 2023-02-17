🎯💡🔥📌✅✔

# 아이템 25 `비동기 코드에는 콜백 대신 async 함수 사용하기`

```
✅ 콜백 보다는 프로미스를 사용하는 게 코드 작성과 타입 추론 면에서 유리하다.

✅ 가능하면 프로미스를 생성하기보다는 async와 await를 사용하는 것이 좋다. 간결하고 직관적인 코드를 생성할 수 있고, 모든 종류의 오류를 제거 할 수 있다.

✅어떤 함수가 프로미스를 반환한다면 async로 선언하는 것이 좋다.
```

<br />
<br />

- 자바스크립트에서 비동기 동작을 모델링할때, `async`와 `await`를 이용해서 `콜백 지옥`을 간단하게 처리 할 수 있다.
- 타입스크립트는 런타임에 관계없이 async/await를 사용할 수 있다.

<br />
<br />

```
🔥 콜백 보다는 프로미스나 async/await를 사용 해야 하는 이유는?

✅ 콜백 보다 프로미스가 코드를 작성하기 쉬움

✅ 콜백 보다  프로미스 타입을 추론하기 쉬움
```

<br />
<br />

> async, await 예시

```ts
async function fetchPages() {
  const respone1 = await fetch(url1);
  const respone1 = await fetch(url2);
  const respone1 = await fetch(url3);
}

// await 키워드는 각각의 프로미스가 처리 될때 까지 fetchPages 함수의 실행을 멈춘다.
// async 함수에서 await 중인 프로미스가 거절되면, 예외를 던진다.

// try/catch 구문
async function fetchPages() {
  const respone1 = await fetch(url1);
  const respone1 = await fetch(url2);
  const respone1 = await fetch(url3);
}catch (e) {
    //.. 에러 상황
}
```

<br />
<br />

## 병렬로 페이지를 로드하고 싶다면 Promise.all을 사용해서 프로미스를 조합하면 된다.

- promise 요청 한번에 보내기 `Promise.all`

<br />

> 위 사용 예시

```ts
async function fetchPages() {
  const [response1, response2, response3] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3),
  ]);
}
```

<br />
<br />

## async 함수는 항상 프로미스를 반환하도록 강제한다.

- number는 즉시 사용한 값임에도 `async 함수`를 통해 반환하면 `프로미스`를 `반환`하게 된다.
- 이것이 이상하게 보일 수 있지만, 실제로는 `비동기 함수`로 `통일`하도록 강제하는데 도움이 된다.

```ts
const asyncNumber = async () => 99;

type AsyncNumberFunction = typeof asyncNumber;
// 타입은 : Promise<number>

const resolveNumber = () => Promise.resolve(99);

type ResolveNumberFunction = typeof resolveNumber;
// 타입은 : Promise<number>
```

<br />
<br />

## async 함수에서 프로미스를 반환하면 또 다른 프로미스로 래핑되지 않는다.

- 여러 Promise가 중첩되어 반환 타입은 Promise 타입이다.

```ts
const duplicateResolve = async () =>
  Promise.resolve(Promise.resolve(Promise.resolve(99)));

type DuplicateResolveFunction = typeof duplicateResolve;
// 타입은 Promise<number>
```

<br />
<br />
<br />

🎯💡🔥📌✅✔

# 타입 추론에 문맥이 어떻게 사용되는지 이해하기

<br />

```
🔥 요약

✅ 변수를 뽑아서 별도로 선언했을 때 오류가 발생한다면 타입 선언을 추가 해야 한다

✅ 변수가 정말로 상수라면 상수 단언을 사용 해야 한다. 그러나 상수 단언을 사용하면 정의한 곳이 아니라 사용한 곳에서 오류가 발생하므로 주의해야한다.

```

<br />

- 타입스크립트는 `타입`을 `추론`할 때 단순이 값만 고려하지 않고 값이 존재하는 곳의 문맥까지도 살핀다.
  - 문맥을 고려해 타입을 추론하면, 가끔 이상한 결과가 나온다.

<br />
<br />

## 변수를 let / const 키워드를 이용해 선언할 때 타입 추론

> 예시

```ts
let language = "JavaScript";

type LaunguageType = typeof language;
// 타입은 string

const language = "JavaScript";

type LaunguageType = typeof language;
// 타입은 "JavaScript"
// const로 선언한 변수는 리터럴 타입으로 추론 되었다.
// 변수를 선언 할때 타입스크립트는 재할당 가능성이라는 문맥을 바탕으로 타입 추론을 다르게 한다.
```

<br />
<br />

- let 키워드에서 string이 아닌 `Javascript`(문자열)로 타입을 주고 싶을 때 타입을 선언 해야 한다

```ts
type LanguageType = "JavaScript";

let language: LanguageType = "JavaScript";
// 타입은 "JavaScript"
```

<br />
<br />

## 튜플 사용 시 주의점

```ts
function panTo(where: [number, number]) {
  /**/
}

// 바로 할당 , [number, number] 바로 할당 가능
panTo([10, 20]); // 정상

//문백과 값을 분리
//loc는 타입스크립트에서 number[]로 추론합니다. (길이를 알 수 없는 숫자 배열)
const loc = [10, 20];
panTo(loc); // 에러
```

<br />
<br />

- 문맥과 값을 분리 했을 때 const , let으로 에러 피하기

> 사용 예시

```ts
//예시 함수
function panTo(where: [number, number]) {
  /**/
}

// 문맥과 값 분리
// 에러 X
const loc: [number, number] = [10, 20];
panTo(loc);
```

<br />
<br />

## const키워드 , as const 키워드 차이

- const 키워드 `튜블을 number[]`로 추론한다.
  - `let`키워드를 이용해서 튜플 혹은 배열을 선언하면, 타입 추론은 `배열` `타입`으로 추론된다.

<br />

> let 키워드를 사용 했을 때

```ts
let tuple = [1, 2];
type TupleType = typeof tuple;
//타입은 number[]
```

<br />

```ts
const tuple = [1, 2];
type TupleType = typeof tuple;
//타입은 number[]
```

<br />
<br />
<br />

## cosnt , let 키워드 모두 튜블 타입을 만들었을때 `number[]`으로 타입이 추론 된다.

- 이유는 `const키워드`는 식별자가 가리키는 `참조자`가 `변하지 않을 거`라고 말하기 때문
  - 참조는 변하지 않지만, `참조하고 있는 값은 언제든지 변할 수 있다.`

> 위 예시

```ts
tuple.push(3);
tuple.push(4);
tuple.push(5);
tuple.push(6);
tuple.pop();
```

<br />
<br />

---

## 위 해결 방법

- 타입 선언

> 에러X

```ts
function panTo(where: [number, number]) {
  /**/
}

const loc: [number, number] = [1, 2];
panTo(loc); // 정상
```

<br />

- 상수에 문맥 제공 ( `readonly` , `as const` )

> 에러X

```ts
const loc = [1, 2] as cosnt;
panTo(loc);

function panTo(where: readonly [number, number]) {
  /**/
}
const loc = [1, 2] as const;
panTo(loc); //정상
```

<br />
<br />

---

## 객체 사용 시 주의할 점

<br />

<br />

```ts
type Language = "Javascript" | "Typescript";
interface GovernedLanguage {
  language: Language;
  organization: string;
}
function complain(language: GovernedLanguage) {
  /* ... */
}
complain({ language: "Typescript", organization: "Microsoft" }); // 정상
const ts = {
  language: "Typescript",
  organization: "Microsoft",
};
complain(ts); //  에러

// ts 객체에서 language의 타입은 string으로 추론된다. 타입 선언을 추가하거나 상수 단언을 사용하여 해결 할 수 있다.
```
