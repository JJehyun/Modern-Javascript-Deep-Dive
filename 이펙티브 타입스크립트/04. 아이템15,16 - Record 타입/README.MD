# 아이템 15 🎯💡🔥📌✅

- 자바스크립트 객체는 문자열 키를 타입의 값에 관계없이 매핑한다.
- 타입에 `인덱스 시그니처`를 명시하여 `유연하게 매핑`을 `표현`할 수 있습니다.

> 예시 코드

```ts
// 인덱스 시그니처를 명시해서 유연하게 매핑하기
type Rocket = { [propery: string]: string };
const rocket: Rocket = {
  name: "kim",
  variant: "Block 5",
  thrust: "7,607",
}; //정상

//인터페이스로 나타내기
interface Rocket {
  name: string;
  variant: string;
  thrust: number;
}
const rocket: Rocket = {
  name: "kim",
  variant: "Block 5",
  thrust: "7,607",
}; //정상

// 이 경우에는 인터페이스의 사용이 권장된다.
```

<br />
<br />

```
💡 `[property:string] : string`은 인덱스 시그니처이다.(3가지의 의미를 담는다.)
- 키의 이름: 키의 위치만 표시하는 용도이다.
- 키의 타입: string이나 number 또는 symbol의 조합이어야 하지만, 보통은 string을 사용한다.
- 값의 타입: 어떤 값이든 될 수 있다.

단점
- name 대신 Name으로 작성해서 유효한 Rocket 타입이 된다.
- 키마다 다른 타입을 가질 수 없다.
```

<br />
<br />

## `인덱스 시그니처`는 `동적 데이터` `표현`할 때 사용한다.

- `csv`파일 처럼 `행`, `열`이름과 값으로 매핑하는 객체로 나타내는 경우
- 예제
  - ![image](../image/t12.png)
  - 일반적인 상황에서 열 이름이 무엇인지 미리 알 방법은 없다.

<br />

- 반대로 `열이름`을 알고 있는 특정한 상황에는 미리 선언해 둔 타입으로 단언문을 사용한다.

```ts
//받는 열이름을 알고 있는 경우 미리 선언해둔 타입으로 단언문을 사용함
interface ProdectRow {
  productId: string;
  name: string;
  price: string;
}
declare let csvData: string;
const prodects = parseCSV(csvData) as unKnown ProductRow[]
```

<br />
<br />

## Record는 키 타입에 유연성을 제공하는 제너릭 타입이다

- 특히, `string`의 부분 집합을 사용할 수 있습니다.
- `Record<Key,Type>` 형식이다.
  - key : 키
  - Type: 값

```ts
//일반적 인덱스 시그니처
type humanInfo = {
  [name: string]: number;
};

let human: humanInfo = {
  홍길동: 20,
  둘리: 30,
  마이콜: 40,
};

//인덱스 시그니처 예제를 Record Type으로 사용(1)
type humanInfo = Record<string, number>;

let human: humanInfo = {
  홍길동: 20,
  둘리: 30,
  마이콜: 40,
};
//Record Type예제(2)
type names = "홍길동" | "둘리" | "마이콜";

type humanInfo = Record<names, number>;

let human: humanInfo = {
  홍길동: 20,
  둘리: 30,
  마이콜: 40,
};
```

<br />

> 또 다른Record 예제

```ts
type Vec3D = Record<"x" | "y" | "z", number>;
//type Vec3D = {
//  x: number;
//  y:number;
//  z:number;
//};
```

<br />

> 또 다른Record 예제

```ts
type Vec3D = { [K in "x" | "y" | "z"]: number };
//완성된 타입
//  Type Vec3D = {
//   x:number;
//   y:number;
//   z:number;
// }

//

type ABC = { [k in "a" | "b" | "c"]: k extends "b" ? string : number };
//완성된 타입
// Type ABC = {
//   a:number;
//   b:number;
//   c:number
// }
```

<br />
<br />
<br />
<br />

# 아이템 16 number 인덱스 시그니처보다는 `Array`,`튜플`,`ArrayLike`를 사용하기

```
✅ 아이템 16 요약
1. 자바스크립트에서는 object의 key 타입은 string 타입 혹은 symbol 타입이다. 다른 타입은 형변환된다.

2. 타입스크립트에서는 자바스크립트와의 일관성을 위해 number 타입의 key 타입을 허용한다.

3. number 인덱스 시그니처보다는 Array, 튜플, ArrayLike를 사용하자.
```

- 자바스크립트는 이상하게 동작하기로 유명한 언어이다.

  - 그 중 대표적인 것은 암시적 강제 타입 변환이다.
  - 암시적 강제 타입 변환은 `===` , `!==`로 해결이 가능하다.

<br />

- `자바스크립트`에서의 객체는 `키/값` 쌍의 모음이다.

  - `키`는 보통 string이고 `값`은 아무값이나 들어올수 있습니다.
  - `숫자`는 키로 사용될 수 없고, 속성을 숫자로 사용하려고 한다면, 자바스크립트 런타임은 `문자열`로 변환한다.
  - arr[0] --> arr["0"]으로 내부적으로 변경된다.

- 타입스크립트는 `숫자 키`를 `허용`하고, `문자열 키`와 `다른것`으로 인식한다.
  - 타입스크립트에서는 일관성을 위해 `number`타입의 키를 허용한다.

> 위 예제

```ts
interface Array<T> {
  //...
  [n: number]: T;
}
```

<br />
<br />

- 어떤 길이를 가지는 배열과 `비슷한 형태`의 튜플을 사용하고 싶다면 타입스크립트에 있는 `ArrayLike` 타입을 사용한다.

- 참고!
  - ArrayLike를 사용하는 경우는 Array와 같이 number 타입의 key로 접근할 수 있으나, Array 프로토타입에 있는 메서드들이 필요없을 때 사용한다.
  - `ArrayLike 사용`
    - ![image](../image/t13.png)
  - `Array 사용`
    - ![image](../image/t93.png)

<br />
<br />
