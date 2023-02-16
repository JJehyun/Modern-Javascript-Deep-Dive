🎯💡🔥📌✅

# `아이템31 타입 주변에 NULL값 배치 하기`

- 단일 객체를 사용해서 null값 한번에 컨트롤 , 그후 if()로 타입 체크

<br />
<br />

```
✅ 요약

✅ 한 값의 null 여부가 다른 값의 null 여부에 암시적으로 관련되도록 설계하면 안된다.

✅ api 작성 시에는 반환 타입을 큰 객체로 만들고 반환 타입 전체가 null이거나 null이 아니게 만들어야한다.

✅클래스를 만들 때는 필요한 모든 값이 준비 되었을 때 생성하여 null이 존재하지 않도록 하는 것이 좋다.

✅strictNullChecks를 설정하면, 코드에 많은 오류가 표시되지만, null값과 관련된 문제점을 찾아낼 수 있기 때문에 반드시 필요하다.
```

- `strictNullChecks` 속성으로 많은 오류가 표시되게 함으로써 null 값과 관련된 문제점을 찾아내 `반드시 필요`

<br />
<br />

> 값이 전부 null이거나 전부 null이 아닌 경우로 분명히 구분된다면, 값이 섞여 있을 때보다 다루기 쉽다. <br />
> 이런 경우타입에 `null를 추가하는 방식으로 모델링이 가능하다.`

```ts
// 잘못된 예시
//nums 배열이 비어있다면, 함수는 [undefined,undefined]를 반환한다.
//undefined를 포함하는 객체를 다루는 것은 어렵고, 절대 권장되지 않는다.

const extent = (nums: number[]) => {
  let min;
  let max;
  for (const num of nums) {
    if (!min) {
      // 여기서 min값만 체크를 했음 , max값은 체크를 안해서 에러
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num); // 이 부분에서 에러
    }
  }
  return [min, max];
};
```

<br />
<br />

## 위 코드의 결함

- 1. extent의 반환 타입이 (number|undefined)[]로 추론되어서 설계적 결함이 분명해짐
- 2. extent 함수에서 오류는 undefined를 min에서만 제외했고 max에서는 제외하지 않아서 발생

<br />
<br />

> 옳바른 예시

```ts
// min과 max를 한 객체에 넣고 한번에 null이거나 null 아니게 함
// 반환 타입이 [number,number] | null 이 되었다.
function extent(nums: number[]) {
  let result: [number, number] | null = null;
  for (const num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }
  return result;
}
```

- 위 예시에서
  - 결과값으로 `단일 객체`를 사용함으로써, `설개를 개선`했고, 타입스크립트가 `null 값 사이 관계를 이해`할 수 있도록 했으며, `버그도 제거했다`.
  - 문제를 해결하기 위해 `단일 객체`사용하고, 함수의 결과값을 단언 혹은 if 구문으로 체크한다.

<br />
<br />
<br />

🎯💡🔥📌✅

# 아이템 32 `유니온의 인터페이스보다는 인터페이스의 유니온 사용하기`

<br />
<br />
<br />

```
✅ 요약

✅유니온 타입의 속성을 여러 개 가지는 인터페이스에서는 속성간의 관계가 분명하지 않기 때문에 실수가 자주 발생하므로 주의 해야 한다.

✅유니온 인터페이스보다 인터페이스의 유니온이 더 정확하고 타입스크립트가 이해하기 좋다.

✅타입스크립트가 제어 흐름을 분석할 수 있도록 타입에 태그를 넣는 것을 고려 해야 한다. 태그된 유니온 타입스크립트와 매우 잘 맞기 때문에 자주 볼 수 있는 패턴인다.
```

<br />
<br />

- 유니온 타입의 속성을 가지는 인터페이스를 작성 중이라면, 혹시 `인터페이스의 유니온 타입을 사용하는 게 더 알맞지는 않을지 검토를 해야한다`

> 잘못된 예시 👎👎 유니온 인터페이스

```ts
interface Layer {
  //(둥근 모서리, 직선)모양이 그려지는 방법을 제어한다.
  layout: FillLayout | LineLayput | PointLayout;
  //(파란선, 굵은선, 얇은선 ,...) 스타일을 제어한다.
  paint: FillPaint | LinePaint | PointPaint;
}
// layout이 LineLayout타입 이면서 paint 속성이 FillPaint 타입 인것은 말이 안된다.
```

<br />
<br />

> 옳바른 예시 👍👍 인터페이스의 유니온 예시

```ts
// 각각 타입의 계층을 분리된 인터페이스로 두기
// 이런식으로 정의하면, layout과  paint 속성이 잘못된 조합으로 섞이는  경우 방지 가능
// type속성은 `태그`이며 런타입에 어떤 타입의 Layer가 사용되는지 판단하는데 사용된다.
interface FillLayer {
  type: "fill";
  layout: FillLayout;
  paint: FillPaint;
}

interface LineLayer {
  type: "line";
  layout: LineLayout;
  paint: LinePaint;
}

interface PointLayer {
  type: "paint";
  layout: PointLayout;
  paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;
```

<br />

<br />

- 타입스크립트에서 type를 참고하여, `Layer의 타입의 범위`를 `좁히기`
- 각 타입의 `속성들 간의 관계를 제대로 모델링하면`, 타입스크립트가 코드의 `정확성을 체크하는데 도움이 된다`.

```ts
function drawLayer(layer: Layer) {
  if (layer.type === "fill") {
    const { paint } = layer; // 타입이 FillPaint
    const { layout } = layer; //타입이Fill Layout
  } else if (layer.type === "line") {
    const { paint } = layer; // 타입이 LinePaint
    const { layout } = layer; //타입이LineLayout
  } else {
    const { paint } = layer; // 타입이 PointPaint
    const { layout } = layer; // 타입이 PointLayout
  }
}
```

---

<br />

<br />

> 선택적 필드가 여러개 있는 경우 두 개의 속성을 하나의 객체로 모아 그 객체가 존재하는지 체크하는 방식으로 사용하면 편리하다. 또한 API와 같이 타입의 구조를 손 댈 수 없는 상황에서 인터페이스의 유니온을 사용해 관계를 모델링할 수 있다.

<br />

<br />

```ts
// 잘못된 설계
//Bad 👎
interface Person {
  name: string;
  //다음은 동시에 있거나 동시에 없습니다.
  placeOfBirth?: string;
  deteOfBirth?: Date;
}

// 옳바른 설계 (1)
//Good 👍
// 두개의 속성을 하나의 객체로 모으는 것이 더 나은 설계이다.
interface Person {
  name: string;
  //다음은 동시에 있거나 동시에 없습니다.
  brith?: {
    place: string;
    date: string;
  };
}

// 옳바른 설계 (2)
//Good 👍
interface Name {
  name: string;
}

interface PersonWithBirth extends Name {
  placeOfBirth: string;
  deteOfBirth: string;
}

type Person = Name | PersonWithBirth;
```
