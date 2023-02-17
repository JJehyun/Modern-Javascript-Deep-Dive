🎯💡🔥📌✅👎👍

# 아이템 36 `해당 분야의 용어로 타입 이름 짓기`

<br />
<br />
<br />

```
🔥 요약

📌 가독성을 높이고 추상화 수준을 올리기 위해 해당 분야의 용어를 사용 해야 한다.

📌 같은 의미에 다른 이름을 붙이면 안된다. 특별한 의미가 있을 때만 용어를 구분 해야 한다.
```

<br />
<br />
<br />

- `타입 이름짓기` 역시 `타입 설계에서 중요한 부분`이다.
  - 엄선된 `타입`, `속성`, `변수`의 이름은 의도를 명확히 하고 코드와 타입의 `추상화 수준을 높여 준다`.
  - 잘못 선택한 타입 이름은 코드의 의도를 왜곡하고 잘못된 개념을 심어 주게 된다.

```ts
// 이렇게 짓기 보다👎👎👎
interface Animal {
  // name은 매우 일반적이 용어, 동물의 학명인지, 일반적인 명칭인지 알 수 없음
  name: string;
  //아마 멸종된 동물을 true로 해야하는지 판단할 수 없다.
  endangered: boolean;
  //서식지라는 뜻 자체가 불분명
  habitat: string;
}

// 이렇게 짓자👍👍👍
interface Animal {
  //name은 구체적인 용어인 commonName , genus , species로 대체 되었다.
  commonName: string;
  genus: string;
  species: string;
  status: ConservationStatus;
  //habitat은 기후를 뜻하는 climates로 변경
  climates: KoppenClimate[];
}
type ConservationStatus = "EX" | "EW" | "CR" | "EN" | "VU" | "NT" | "LC";
type KoppenClimate = "Af" | "Am" | "As" | "Aw" | "BSh" | "BSk" | "BWh";
```

- 타입 이름을 만들 때 자체적으로 용어를 만들어 내려고 하지말고, `해당 분야에 이미 존재하는 용어를 사용 해야 한다`.
  - 이런 용어들을 사용하면 사용자와 `소통`에 유리하며 `타입의 명확성`을 올릴 수 있다.

<br />
<br />
<br />

```
✅ 타입, 속성, 변수에 이름을 붙일 때 명심해야 할 세가지 규칙

✅ 동일한 의미를 나타낼 때는 같은 용어를 사용 해야 한다.

✅ data,info,thing 같은 모호하고 의미없는 이름은 피해야 한다.

✅ 이름을 지을 때 포함된 내용이나 계산 방식이 아니라 데이터 자체가 무엇인지 고려 해야 한다.
```

<br />
<br />
<br />
<br />
<br />
<br />

🎯💡🔥📌✅👎👍

# 아이템 37 `공식 명칭에는 상표를 붙이기`

- 타입스크립트는 구조적 타이핑 때문에 가끔 이상한 결과를 발생시킬 수 있다.
  - 이럴 경우 `상표_brand`를 이용한다.
  - 이 기법은 타입 시스템에서만 동작하여 `런타임 오버헤드를 줄이는 효과`가 있다.
    - `런타임에 상표를 검사하는 것과 동일한 결과를 얻을 수 있다`.

```ts
// 이진 탐색시 목록이 정렬되어있는지 확인하는 상표 기법
type SortedList<T> = T[] & { _brand: "sorted" };

const isSorted = <T>(xs: T[]): xs is SortedList<T> => {
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] < xs[i - 1]) {
      return false;
    }
  }
  return true;
};
```

<br />
<br />
<br />
<br />
<br />
<br />

🎯💡🔥📌✅👎👍

# 아이템 38 `any 타입은 가능한 한 좁은 범위에서만 사용하기`

> any에 대한 사용법

```ts
function processBar(b: Bar) {
  /* ... */
}

function f() {
  const x = expressionReturnFoo();
  processBar(x);
  // ~ `Foo` 형식의 인수는 `Bar` 형식의 매개변수에 할당될 수 없습니다.
}

//////
//////
//////

// 오류를 제거하는 방법(1)  권장되지 않음
function f1() {
  const x: any = expressionReturningFoo();
  processBar(x as any);
}

// 오류를 제거하는 방법(2) 권장됨
// 이 방식이 권장되는 이유는  processBar 함수의 매개변수에서만 서용된 표현식이므로 다른 코드에 영향을 미치지 않기 때문이다.
function f2() {
  const x = expressionReturningFoo();
  processBar(x as any);
}
```
