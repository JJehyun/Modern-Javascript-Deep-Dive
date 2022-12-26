# 객체

```
💡  자바스크립트는 `객체 기반 언어` , 자바스크립트의 거의 모든 것이 `객체`
```

- 원시값(primitive value) 을 제외한` 함수`, `배열`, `정규 표현식` 등은 모두 객체
- `원시 타입`은 `하나의 값`만 나타내지만 `객체 타입`은 `다양한 타입의 값`(원시 값 또는 다른 객체)을 하나의 단위로 구성
- 원시값은 `변경 불가` 한 값이지만, 객체는 `변경 가능` 한 값
- 객체는 0개 이상의 프로퍼티(property) 로 구성된 집합이며, `프로퍼티`는 `키(key)` : `값(value)` 로 구성
- 자바스크립트에서 `함수(function) 도 프로퍼티의 값`으로 설정가능 → `메서드(method)`

```JS
var myObj = {
  num_key: 0_value,  // 프로퍼티
  increase: function () { ... }  // 메서드
  }
```

```
[ 💡 NOTE ]
프로퍼티 = 객체의 `상태`를 나타내는 값
메서드 = 프로퍼티(`상태 데이터`)를 참조하고 `조작`할 수 있는 동작
```

<br />
<br />

---

# 프로퍼티

```
 💡 객체 프로퍼티의 집합 , 프로퍼티는 키와 값으로 구성된다.
```

- `프로퍼티 키` : ""(빈문자열) , `문자열`(string) , `심벌`(symbol) 프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할
- `프로퍼티 값` : 자바스크립트에서 `사용 가능 한 모든 값`
- 식별자 네이밍 규칙을 `따르지 않는` 이름에는 반드시 `따옴표`를 `사용`해야 한다.
- 사`용 가능한 유요한` 이름인 경우, `따옴표`("" '') 를 생략할 수 있다.

> 프로퍼티 키, 값 네이밍 예제

```js
var person = {
	firstName: 'Young-min',  // 식별자 네이밍 규칙을 준수한 프로퍼티 키 , 따옴표 생략
    'last-name': 'WI',       // 식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키 (따옴표 생략 안 됨 )
    last-name: 'WI'          // SyntaxError: Unexpected token ( 식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키 )-연산을 함
};
```

<br />

- > 문자열 , 심벌 type 아닌 프로퍼티 키 예제
- > 문자열 , 심벌 type이 아닌 키는 문자열이나 심벌타입으로 암묵적으로 변환됨

```js
var foo = {
  0: 1,
  1: 2,
  2: 3,
};
console.log(foo); // { '0': 1, '1': 2, '2': 3 } << 키값이 문자열 형태로 암묵적 타입 변환
```

<br />

- > 동일 객체 내 같은 이름의 프로퍼티 키 중복 선언하면 나중에 선언한 프로퍼티가 덮어쓴다.

```js
var foo = {
  name: "중복",
  name: "중복2",
};
//에러가 생기진 않는다.
console.log(foo); // { name: '중복2' }
```

<br />
<br />

<br />
<br />
<br />
<br />
<br />
<br />

# 프로퍼티 접근 방식 (2가지)

- `마침표 표기법` : (.) `마침표`를 프로퍼티 접근 연산자로 사용
- `대괄호 표기법` : ([ ]) `대괄호`를 프로퍼티 접근 연산자로 사용
  > 마침표 표기법 , 대괄호 표기법 예제

```js
var person = {
  name: "예제",
};

console.log(person.name); // "예제" ( 마침표 표기법 )
console.log(person["name"]); // "예제" ( 대괄호 표기법 ) , 따옴표가 꼭 있어야 함
```

```
💡 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표("")로 감싼 문자열이어야한다.
ex) console.log(person[name])   // undefined
ex) console.log(person["name"]) // 예제
```

<br />
<br />

# 프로퍼티의 값 동적 추가 삭제

> 🎯 프로퍼티 동적 `생성`

```js
var person = {
  name: "kim",
};
person.age = 20; // {name : "kim" , age : 20 }
```

<br />

> 🎯 프로퍼티 `삭제`

```js
var person = {
  name: "kim",
};
delete person.name --> {""}  //name 프로퍼티 삭제
```

<br />
<br />

# 🎯🎯ES6의 객체 리터럴 확장 기능

> 프로퍼티 값으로 변수를 사용하는 경우 변수이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다.
> 아래 예제

(1) 간소화

```js
es5)
var x = 1 , y = 2;
var obj = {
    x : x
    y : y
};

es6)
let x = 1,y = 2
const obj = {x , y }
//둘다 같은 객체를 생성 함
```

(2) 객체 프로퍼티 추가 (객체 리터럴 내부에서 계산된 프로퍼티 이름)

```js
es5)
var prefix = "prop";
var i = 0;

var obj = {};
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }


es6)
const prefix = "prop";
let i = 0;
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }
```

(3) 메서드 표현

```js
es6)

const obj ={
    ...
    //함수 프로퍼티 표현
    함수(){
        ...
    }
}
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

---

# 자바스크립트의 여러가지 객체 생성 방법(5가지)

- `객체 리터럴`
- `object 생성자 함수`
- `생성자 함수`
- `Object.create 메서드`
- `클래스(ES6)`

## 1. 객체 리터럴을 이용한 객체 생성 방법

- 중괄호( { ... } ) 내에 `0개 이상의 프로퍼티를 정의`
- 변수에 할당되는 시점에 자바스크립트 엔진은 `객체 리터럴을 해석해 객체를 생성`

```js
var person = {
  name: "Wi",
  sayHello: function () {
    console.log(`Hello My name is ${this.name}`);
  },
};

console.log(typeof person); // object
console.log(person); // { name: 'Wi', sayHello: [Function: sayHello] }
```
