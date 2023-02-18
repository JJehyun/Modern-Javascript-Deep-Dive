🎯💡🔥📌✅👎👍

# `아이템42 모르는 타입의 값에는 any 대신 unknown을 사용하기`

<br />
<br />

```
🔥 요약 🔥

✅ unknown은 any 대신 사용할 수 있는 안전한 타입이다. 어떤한 값이 있지만 그타입을 알지 못하는 경우는 unknown를 사용한다.

✅ 사용자가 타입 단언문이나 타입 체크를 사용하도록 강제하려면 unknown을 사용하면 된다.

✅ {},object,unknown의 차이점을 이해 해야 합니다.
```

<br />
<br />

- 함수의 반환타입으로 `any`를 사용하는 것은 좋지 못한 설계이다.

> 험수의 반환값으로 any를 사용한 잘못된 예시

```ts
// 함수의 반환 타입으로 any는 좋지 못한 설계이다.👎👎
function parseYAML(yaml: string): any {
  //..
}

// 호출한 곳에서 반환값을 원하는 타입으로 할당하는 것이 이상적이다.
interface Book {
  name: string;
  author: string;
}
const book: Book = parseYAML(`
  name: kim;
  author: lee;
`);
alert(book.title); // 오류없음 , 런타임에 undefined 경고
book("read"); // 오류없음 , 런타임에 TypeError 예외 발생
```

- 함수의 반환값에 타입 선언을 강제할 수 없기 때문에, `호출한 곳에서 타입 선언을 생략`하게 되면 book `변수는 암시적 any` 타입이 되고, 타입 `오류가 날 확률이 높아진다`.

<br />
<br />

- 함수의 반환타입으로 `any` 보단 `unknown`를 사용하는 방식이 좋다.

> 함수의 반환값으로 unknown를 사용한 옳바른 예시

```ts
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book: Book = parseYAML(`
  name: kim;
  author: lee;
`);
alert(book.title); // ~~~ 개체가 `unknown`형식입니다.
book("read"); //  ~~~ 개체가 `unknown`형식입니다.
```

<br />
<br />

```
🔥 any의 특징
1. 어떤한 타입이든 any타입에 할당 가능하다
2. any타입은 어떠한 타입으로도 할당 가능하다

이러한 any의 속성은 ‘한 집합은 다른 모든 집합의 부분 집합이면서 동시에 상위집합이 될 수 없는' 타입 시스템과 상충되는 면을 가지고 있다.

🔥 unknown의 특징
1. unknown은 any 대신 쓸 수 있는 타입 시스템에 부합하는 타입이다.
2. unknown은 오직 unknown과 any에만 할당이 가능하다.
두 번째 속성으로 이 타입을 사용하려면 적절한 타입으로 변환해야한다.
```

## unknown 사용법

- unknown상태로 값을 사용하려한다면 오류가 발생한다.
  - 적절한 타입으로 강제 변환 후 값을 사용 해야 한다.

<br />
<br />

> unknown 타입 변환 방법(1) instanceof

```ts
function processValue(val: unknown) {
  if (val instanceof Date) {
    val; // 타입이  Date
  }
}
```

<br />
<br />

> unknown 타입 변환 방법(2) 타입 가드

```ts
function isBook(val: unknown): val is Book {
  return (
    typeof val === "object" && val !== null && "name" in val && "author" in val
  );
}
function processValue(val: unknown) {
  if (isBook(val)) {
    val; //타입이 book
  }
}
```

<br />
<br />

---

```ts
//아래의 예제와 같이 제네릭을 사용하여 변환하는 경우도 있는데, 일반적으로 타입 단언문과 기능이 비슷하며 타입스크립트에서 좋지 않은 스타일이다. 따라서 unknown을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋다!

// 제네릭을 사용한것인데, unknown 반환하는것이 더 좋다고함
const safeParseYAML = <T>(yaml: string): T => {
  return safeParseYAML(yaml);
};

//unknown과 유사하게 {}, object 타입들이 있다. 그러나 이 타입의 경우 아래와 같은 특성을 가진다.
//{} 타입은 null과 undefined를 제외한 모든 값을 포함한다.
//object 타입은 모든 비기본형 타입으로 이루어진다. 객체와 배열이 포함된다.
```
