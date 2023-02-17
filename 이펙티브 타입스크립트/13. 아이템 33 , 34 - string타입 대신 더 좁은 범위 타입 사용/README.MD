🎯💡🔥📌✅👎👍

# 아이템 32 `String 타입보다 구체적인 타입 사용하기`

<br />
<br />

```
🔥 아이템 32 요약하기

✅ 문자열로 남발하여 선언된 코드를 피해야 한다.

✅ 변수의 범위를 보다 정확하게 사용하고 싶다면, 리터럴 타입의 유니온을 사용한다.
ex) type RecordingType = "live" | "studio";

✅ 객체의 속성 이름을 함수 매개변수로 받을 때는 string보다는 keyof를 사용해야한다.
```

<br />
<br />

- `string` 타입의 범위는 매우 넓다.
  - `string` 타입으로 변수를 선언한디면, 그보다 더 좁은 타입이 적절하지 읺을지 검토 해야 한다.

<br />
<br />

> 잘못된 예시

```ts
//잘못된 형식👎👎
interface Album {
  artist: string;
  title: string;
  releaseDate: string; // YYYY-MM-DD
  recordingType: string; // `live` or `studio`
}
// 주석에 타입 정보를 적어 둔걸보면, 현재 인터페이스가 잘못되었다는 것을 알 수 있다.
```

<br />
<br />
<br />

> 옳바른 예시

```ts
//옳바른 예시👍👍
//이런식으로 코드를 바꾸면, 타입스크립트는 오류를 세밀하게 체크한다.
type RecordingType = "live" | "studio";

interface Album {
  artist: string;
  title: string;
  releaseDate: Date; // YYYY-MM-DD
  recordingType: RecordingType; // `live` or `studio`
}
```

<br />

## 위 옳바른 예시로 코드를 짰을 때 `장점 3가지`

<br />

### (1) 타입을 명시적으로 정의함으로써 다른 곳으로 값이 전달되어도 타입 정보가 유지된다.

<br />

> 위 예시

```ts
function getAlbumsOfType(recordingType: string): Album[] {
  //...
}
```

<br />

### (2) 타입을 명시적으로 정의하고 해당 타입의 의미를 설명하는 주석을 붙여 넣을 수 있다.

<br />

```ts
// getAlbumsOfType이 받는 매개변수를 string 대신 RecordingType으로 바꾸면, 함수를 사용하는 곳에서 RecordingType의 설명을 볼 수 있습니다.

//** 이 녹음은 어떤 환경에서 이루어졌는지?*/
type RecordingType = "live" | "studio";
```

<br />

### (3) keyof 연산자로 더욱 세밍하게 객체 속성의 체크가 가능해집니다.

- 함수의 매개변수에서 `string`을 잘못사용하는 일은 흔하다.

```ts

// 이렇게 작성하면 반환되는 타입이 (string | Date)[]가 되는데,
const pluck = <T>(recors: T[], key: keyof T) => {
  return records.map((r) => r[key]);
};

// 이렇게 작성하면 반환되는 타입이 Date[] 가 된다.
// 또한 호출 부분에 있어서 매개변수 타입이 정밀해진 덕분에 자동완성 기능을 제공해준다.
const pluck = <T, K extends keyof T>(records: T[], key: K) => {
  return records.map((r) => r[key]);
};

// T 객체 내의 가능한 모든 값의 타입
T[keyof T]
```

<br />
<br />

- 객체의 속성 이름을 함수 매개변수로 받을 때, `string` 보다는 `keyof`를 사용하는 편이 좋다.

> 예시

```ts
type K = keyof Album;
//타입이 "artist" | "title" | "releaseDate" | "recordingType"
```

<br />
<br />
<br />

🎯💡🔥📌✅👎👍

# 아이템 32 `부정확한 타입보다는 미완성 타입을 사용하기`

- 잘못된 타입은 차라리 타입이 없는 것보다 못할 수 있다.

  - 타입 선언의 정밀도를 높이려다가 더 좋지않은 개발 경험을 할 수 있으니 주의해야한다.
  - 오히려 타입이 부정확해지는 경우가 있다.

- 정확하게 타입을 모델링할 수 없다면, 부정확하게 모델링하지 말고, `any`와 `unknown`을 구별해서 사용

<br />
<br />

```
🔥 any 와 unknown

📌 any : 어떤한 값이든 가능, 타입을 좁혀서 사용하지 않아도 됨

📌 unknown : 어떠한 값이 올 수 있는지 모르므로, 타입을 좁혀서 사용해야함, 다른 값에 할당이 불가능

```

<br />
<br />

> 예시

```ts
// bad👎👎
interface Point {
  type: "Point";
  // 좌표에 쓰이는 number[]는 약간 추상적이다.
  coordinates: number[];
}

type GeoPosition = [number, number];
interface Point {
  type: "Point";
  //좌표이니, 튜블 타입으로 선언
  //위치 정보에는 세번째 요소인 고도가 있을 수 있고, 또 다른 정보가 있을 수 있다.
  //결과적으로 타입 선언을 세밀하게 만들려고 했지만, 시도가 너무 과했고, 오히려 타입이 부정확 해졌다.
  coordinates: GeoPosition;
}
```
