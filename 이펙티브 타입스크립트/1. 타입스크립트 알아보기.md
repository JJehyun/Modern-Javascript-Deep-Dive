# 타입스크립트 알아보기 🎯💡🔥📌✅✔

<br />
<br />

- 타입스크립트는 타입이 정의된 자바스크립트의 상위집합(superset)이다.
  - 자바스크립트는 타입스크립트의 부분집합이다
- 자바스크립트 프로그램에 문법 오류가 없다면, 유효한 타입스크립트 프로그램이라고 할 수 있다.
- `모든 자바스크립트` 프로그램은 `타입스크립트`이다.
  - 반대는 성립X(타입스크립트 이지만 자바스크립트가 아닌 프로그램이 존재한다.)
  - 타입스크립트가 타입을 명시하는 부분이 있기 때문

---

## 타입시스템의 목표는 런타임에 오류를 발생시킬 코드를 미리 찾는 것이다.

- 타입구문이 없어도 타입 체커는 문제점을 찾는다.
- 타입체커는 의도와 다르게 동작하는 코드를 찾아낸다.
- 타입 구문이 있다면
  1. 어디서 오류가 발생했는지 찾을 수 있다
  2. 해결책을 제시해준다

<br />
<br />

> 예시 코드

```TSX
// 📌 타입 구문이 없는 경우
const states = [
  { name: 'a', capital: '1' },
  { name: 'b', capital: '2' },
  { name: 'c', capital: '3' },
];

for (const state of states) {
  console.log(state.capitol);
  //'capitol' 속성이 '{ name: string; capital: string; }' 형식에 없습니다.
  //'capital'을(를) 사용하시겠습니까?



// 📌 타입 구문이 있는 경우
  interface State {
  name: string;
  capital: string;
}
const states: State[] = [
  { name: 'a', capital: '1' },
  { name: 'b', capital: '2' },
  { name: 'c', capitol: '3' },
];
// 개체 리터럴은 알려진 속성만 지정할 수 있지만
// 'State' 형식에 'capitol'이(가) 없습니다.
// 'capital'을(를) 쓰려고 했습니까?

for (const state of states) {
  console.log(state.capital);
}
}
```

<br />
<br />
<br />

---

## 타입스크립트 타입 시스템은 자바스크립트의 런타임 동작을 모델링한다.

- 다른 언어였다면 런타임 오류될 코드인데 타입 체커는 정상으로 인식

```tsx
const x = 2 + "3"; // 정상, string 타입입니다.
const y = "2" + 3; // 정상, string 타입입니다.
```

- 런타임에 오류가 발생하지 않는 코드인데 문제점을 표시하는 경우도 있다.

```tsx
const a = null + 7;
const b = [] + 12;
alert("Hello", "TypeScript");
```

- 타입스크립트의 도움을 받으면 오류가 적은 코드를 작성할 수 있다.

```
💡 요약
✅ 타입스크립트는 자바스크립트의 상위집합이다
✅ 모든 자바스크립트 프로그램은 타입스크립트 프로그램이다
✅ 타입스크립트는 별도의 문법을 가지고 있기 때문에 일반적으로는 유효한 자바스크립트 프로그램이 아니다.
✅ 타입스크립트는 자바스크립트 런타임 동작을 모델링하는 타입 시스템을 가지고있기 때문에 런타임 오류를 발생시키는 코드를 찾아내려고한다. 그러나 타입 체커를 통과하면서도 런타임 오류를 발생시키는 코드는 충분히 존재할 수 있다.
✅ 자바스크립트에서는 허용되지만 타입스크립트에서는 문제가 되는 경우도 있다.
```

<br />
<br />
<br />

---

# 타입스크립트 기본 설정 파일

- 타입스크립트 컴파일러는 1`00개 이상`의 설정을 가짐
- 설정 파일은 `tsc --init`를 이용해 생성
  - `어디서 소스 파일`을 `찾을 지`, `어떤 종류`의 `출력`을 생성할지 제어하는 내용이 대부분

<br />
<br />

## noImplicitAny (tsconfig.json 설정 중 1)

- 변수들이 `미리 정의된 타입`을 가져야하는지 여부
- `noImplicitAny`가 해제되어 있는 경우 변수가 `any 타입`으로 간주된다.
  - `암시적 any`
- 되도록이면 noImplicitAny 를 설정 하는 것이 좋다.

 <br />

> 예시코드

```tsx
// noImplicitAny 설정 OFF
function add(a, b) {
  //에러X
}

// noImplicitAny 설정 ON
function add(a: number, b: number) {
  // 타입을 지정해줘야 에러X
}
```

<br />
<br />

## strictNullChecks (tsconfig.json 설정 중 1)

- `null` 과 `undefined`가 모든 타입에서 허용되는지 확인 하는 설정
- `null` 과 `undefined`의 오류를 잡아내는데 좋지만, `코드 작성을 어렵게 한다.`
- `strictNullChecks` 를 설정하려면 `noImplicitAny` 를 먼저 설정해야한다.
- 타입스크립트에 strict 설정을 하면 대부분의 오류를 잡아낸다.

<br />

> 예시코드

```tsx
// strictNullChecks OFF
const x: number = null; //정상 null은 유효한 값입니다.

// strictNullChecks ON
const x: number = null; // 'null' 형식은 'number' 형식에 할당할 수 없습니다.
const y: number | null = null;
```

```
💡요약 (tsconfig.json)
✅ 되도록이면 `noImplicitAny` 를 설정하는 것이 좋다
✅ “undefined는 객체가 아닙니다” 같은 런타임 오류를 방지하기 위해서는 `strictNullChecks` 를 설정하는 것이 좋다.
✅ 타입스크립트에서 엄격한 체크를 하고 싶다면 strict 설정을 고려하면 된다.
```

# 아이템 3 코드 생성과 타입이 관계없음을 이해하기

- 타입스크립트는 두가지 역할을 수행한다

1. 최신 타입스크입트/자바스크립트를 브라우저에서 동작 할 수 있도록 구버전의 자바스크립트로 `트랜스 파일`한다.
2. 코드의 `타입 오류를 체크`한다.

<br />

```
✅ 위 두가지는 완전히 독립적이다.
- 타입스크립트가 자바스크립트로 변환될 때 코드 내의 타입에서는 영향을 주지 않는다.
- 또한 자바스크립트의 실행 시점에도 타입은 영향을 미치치 않는다.
- 타입에 오류가 있더라도 컴파일이 가능하다.
- 자바스크립트로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 문은 은 그냥 제거된다.
```

<br />
<br />

## 타입 연산은 런타임에 영향을 주지 않는다.

> 예시

```js
// 잘못된 코드
// 코드에 아무런 정제 과정이 없고, as number은 타입연산 이므로 런타임동작에는 아무런 영향을 주지 못한다.
//값을 정제 하기 위해서 타입을 체크 후 자바스크릡트 연산을 통해 변환을 수행 해야 한다.
function asNumber(val:number|string) : number {
  return val as number
}

// 변환된 자바스크립트 코드
function asNumber(val){
  return val;
}

//정제 과정이 들어간 옳바른 코드
function asNumber(val:number|string):number {
  return typeof(val) === "string" ? Number(val) : val;
}
```

<br />
<br />

## 런타임 타입은 선언된 타입과 다를 수 있다.

- `타입스크립트에서는 런타임 타임과 선언된 타입이 맞지 않을 수 있다.` 타입이 달라지는 혼란스러운 상황을 가능한 피해야 한다. `선언된 타입이 언제든지 달라질 수 있다는 것을 명심하고 있어야 한다.`

```js
interface LightApiResponse {
  lightSwitchValue: boolean;
}

async function setLight() {
  const response = await fetch("/light");
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}

function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log("실행되지 않을까봐 걱정입니다.");
  }
}
```

## 타입스크립트 타입으로는 함수를 오버로드 할 수 없다.

- 타입스크립트에서는 타입과 런타입의 동작이 무관하기 때문에, 함수 오버로딩이 불가능 하다.
- 타입스크립트가 함수 오버로딩 기능을 지원하지만, 온전히 타입 수준에서만 동작한다.
- 하나의 함수에 대해 여러 개의 선언문을 작성할 수 있는 것은 `구현체` 오직 하나 뿐이다.

```
✔ 동일한 이름에 매개 변수만 다른 여러 버전의 함수를 만드는 것 : 함수 오버로딩
```

<br />

```js
function add(a: number, b: number) {
  return a + b;
}
// ~~ 중복된 함수 구현입니다.

function add(a: string, b: string) {
  return a + b;
}
// ~~ 중복된 함수 구현입니다.
```

<br />
<br />
<br />

## 타입스크립트 타입은 런타임 성능에 영향을 주지 않는다.

- 타입과 타입 연산자는 자바스크립트 변환 시점에 제거 되기 때문에, 런타임의 성능에 아무런 영향을 주지 않음
  - 런타임 오버헤드가 없는 대신, 타입스크립트 컴파일러는 `빌드타임` 오버헤드가 있다.
  - 코드 생성은 타입 시스템과 무관하다. 타입스크립트 `타입은 런타임 동작이나 성능에 영향을 주지 않는다.`
  - 타입 오류가 존재하더라도 `컴파일` 가능하다.
  - `타입스크립트 타입은 런타임에 사용할 수 없다`. 런타임에 타입을 지정하려면, 타입 정보 유지를 위한 별도의 방법이 필요하다.

<br />
<br />
<br />

# `아이템4` 구조적 타이핑에 익숙해지기

- 자바스크립트는 덕 타이핑 기반이고, 타입스크립트가 이를 모델링하기 위해 구조적 타이핑을 사용해야함
- 어떤 인터페이스에 할당 가능한 값이라면 타입 선언에 명시적으로 나열된 속성들을 가지고 있다. 이는 타입이 `봉인` 되어 있지 않다는 것을 의미한다.
- `클래스 역시 구조적 타이핑 규칙을 따른다는 것을 명심해야함` 클래스의 인스턴스가 예상과는 다를수 있다.
- 구조적 타이핑을 사용하면 유닛 테스팅을 손쉽게 할 수 있다.

```
✅ 구조적 타이핑이란?
코드 구조 관점에서 타입이 서로 호환되는지 판단한다. 구조적으로 더 큰 타입은 작은 타입을 호환 할 수 없다.
```

> 예시 코드

```js
interface people {
	name: 'string',
	age: 'string'
}

interface Person {
	name: 'string'
}

const developer: people;
const person: Person;

// 구조적으로 더 큰 타입은 적은 타입을 호환 할 수 없다.
developer = peason; // ~~ Error
person = developer // ~~ 정상
```

# `아이템5` any 타입 지양하기

- 타입스크립트의 타입은 `점진적`이고 `선택적`이다.
  - 코드에 타입을 조금식 추가 가능 : `점직적`
  - 언제든지 타입 체커를 해제 가능 : `선택적`

```ts
let age: number;
age = `12`;
// error
age = `12` as any; //OK

// as any로 오류를 해결 할 수 있지만, any를 사용하면, 타입스크립트의 수많은 장점을 누릴 수 없게 된다.
```

<br />
<br />

- ✔`any 타입에는 안전성이 없다`
  - number 타입으로 선언되었지만, as any를 사용해서 string 할당이 가능해짐
  - 타입 체커는 선언에 따라 `number타입`으로 판단할 것이고, `혼돈은 걷잡을 수 없게 된다`.

```ts
let age: number;
age = `12`;
// error
age = `12` as any; //OK

age += 1; // 런타입에는 정상, age = `121`
```

<br />
<br />

- ✔`any는 함수 시그니처를 무시 해버린다.`

  - 호출하는 쪽은 약속된 타입의 입력을 제공하고, 함수는 약속된 타입의 출력을 반환한다.
  - `any를 사용하면 위 약속을 어길 수 있다`.

> 예시

```ts
function calciualate(brithDate: Date): Number {
  //
}
let birthDate: any = "1990-01-01";
calciualate(birthDate); //정상
```

<br />
<br />

- ✔`any 타입에는 언어 서비스가 적용되지 않는다`
  - 어떤 심벌에 타입이 있다면 타입스크립트 언어 서비스는 자동완성 기능과 적절한 도움말을 제공한다.
  - 그러나 any타입인 심벌을 사용하면 아무런 도움을 받을 수 없다.

<br />
<br />

- ✔`any 타입은 코드 리팩터링 때 버그를 감춥니다.`
- ✔`any는 타입 설계를 감춰버린다.`
  - 앱 상태 같은 객체를 정의하려면 꽤 복잡하다. 상태 객체 안에 있는 수많은 속성의 타입을 일일이 작성해야하는데, any 타입을 사용하면 간단히 끝내 버릴 수도 있다.
  - 하지만 이때도 any를 사용하면 안된다. 객체를 정의할 때 특히 문제가 되는데, 상태 객체의 설계를 감춰버리기 때문이다.

<br />
<br />

```
📌any는 타입시스템의 신뢰도를 떨어뜨린다.
📌any 타입을 사용하면 타입 체커와 타입스크립트 언어 서비스를 무력화시켜 버린다.
📌any타입은 문제점을 감추며, 개발 경험을 나쁘게 하며 타입 시스템의 신뢰도를 떨어뜨린다.
```
