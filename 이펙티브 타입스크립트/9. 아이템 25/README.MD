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
