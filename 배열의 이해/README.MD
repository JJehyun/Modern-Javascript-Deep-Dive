# 배열 🎯💡🔥📌✅

- 배열이란 여러 개의 값을 `순차적으로 나열한 자료구조`이다.
- 배열이 가지고 있는 값을 `요소`
  - 자바스크립트의 모든값은 배열의 요소가 될 수 있다.
  - `원시값`, `함수`, `객체` 모든것이 배열의 요소가 될 수 있다.
- 배열의 요소에 접근할 때 대괄호 표기법을 사용한다.
  - EX) arr[0] , arr[1] , ...
- 자바스크립트는 배열이라는 타입은 존재 하지 않는다. 배열은 `객체 타입`이다.

<br />
<br />
<br />

```
📌 배열은 배열 리터럴, Array 생성자 함수, Array of, Array.from메서드로 생성

📌 배열의 생성자 함수는 Array

📌 배열의 프로토타입 객체는 : `Array.prototype`이며, `Array.prototype`은 배열을
    위한 빌트인 메서드를 제공한다.
```

```js
const arr = [1, 2, 3];

arr.constructor === Array; //true
Object.getPrototypeOf(arr) === Array.prototype; // true
```

## 배열은 객체지만 일반 객체와는 구별되는 독특한 특징을 가지고 있다.

- 배열의 `장점`은 순차적으로 요소 접근 가능
- 특정 위치 부터 순차적으로 요소에 접근 가능
  - 이는 배열이 인덱스, 즉 값의 순서와 length 프로퍼티를 갖기 때문이다.

| 구분            | 객체                      | 배열          |
| --------------- | ------------------------- | ------------- |
| 구조            | 프로퍼티 키와 프로퍼티 값 | 인덱스의 요소 |
| 값의 참조       | 프로퍼티 키               | 인덱스        |
| 값의 순서       | X                         | O             |
| length 프로퍼티 | X                         | O             |

---

<br />
<br />
<br />

---

# 자바스크립트 배열은 배열이 아니다.

```
✅ 희소 배열은 성능에 좋지 않은 영향을 준다, (희소배열은 사용하지 않는 것이 좋다.)
✅ 요소의 타입이 일치하는 배열을 생성할 때 일반적인 의미의 배열처럼 연속된 메모리 공간을 확보한다.
```

- `밀집 배열 장점`
  - 자료구조에서 말하는 배열은 동일한 크기의 메모리 공간에 `빈틈없이 연속적으로 나열`된 자료구조를 말한다.
  - 각 요소가 동일한 데이터 크기, 빈틈없이 연속적이면 인덱스를 통해 단 한번의 연산으로 임의의 요소에 접근할 수 있다.
  - 매우 효율적, 고속임
  - ![image](../image/494.png)

<br />
<br />

- `밀집 배열의 단점`
  - 정렬되지 않은 배열에서 특정 요소를 찾을 때 `모든 요소를 특정 요소 찾을 때까지` 차례대로 검색해야함
  - ![image](../image/4955.png)
  - 배열에 요소를 중간에 `삽입` , `삭제`하는 경우 배열의 요소를 `연속적으로 유지하기 위해` 요소를 이동시켜야 하는 단점이 있다.
  - ![image](../image/495.png)

```
🔥자바스크립트의 배열은 밀집 배열이 아닌, 희소 배열이다.
```

<br />
<br />

---

- `희소 배열`
  - 배열의 요소를 위한 각각의 메모리 공간은 `동일한 크기를 가지지 않아도 된다`.
  - `연속적으로 이어져 있지 않을 수도 있다`.
  - 자바스크립트의 배열은 `일반적인 배열의 동작을 흉내 낸 특수 객체`
    - ![image](../image/496.png)
    - 위 사진 처럼 배열은 `인덱스`를 `나타내는 문자열을 프로퍼티 키`로 가지며, length 프로퍼티를 갖는 특수 한 객체이다.
    - 자바스크립트의 배열의 요소는 프로퍼티의 값이다.

> 자바스크립트 모든 요소는 배열의 요소가 될 수 있다.

```js
const arr = [`string`, 10, true, NaN, [], {}, function foo() {}];
```

<br />
<br />

```
💡 ✅일반적인 배열 vs 📌자바스크립트 배열

✅ 일반적인 배열은 인덱스로 요소에 빠르게 접근가능, 요소 삭제,삽입 효율적이지 X

📌 자바스크립트의 배열은 해시 테이블로 구현된 객체이므로, 인덱스로 요소에 접근 시 성능적으로 느림, 하지만 요소 삽입, 삭제의 경우 일반적인 배열보다 효율적이다.
```

<br />
<br />
<br />

---

# length 프로퍼티와 희소 배열

- length 프로퍼티는 `배열의 요소`의 갯수를 나타낸다.
- length 프로퍼티 값은 `0 ~ 2^32 - 1` 미만의 양의 정수 를 가진다.

  - 즉, 최대 `2^32 - 1 `개의 `요소` 를 가질 수 있다.

- length 프로퍼티 값은 요소의 개수, `배열의 길이`를 바탕으로 `결정`되지만, `임의의 숫자 값`을 명시적으로 `할당` 할 수 있다.
  - ![image](../image/498.png)
  - 현재 length 프로퍼티 값보다 큰 숫자를 할당하는 경우에 length 프로퍼티 값은 변경하지만 실제로 배열의 길이는 늘어나지 않는다.
    - length 프로퍼티 값은 성공적으로 `변경`, 실제 배열의 `아무런 변함이 없다`. 값 없이 비어 있는 요소를 위해 `메모리 공간을 확보하지 않는다`.

```js
const arr = [1];

//현재 length 프로퍼티 값인 1보다 큰 값인 3을 할당
arr.length = 3;

//length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지 않는다.
console.log(arr.length); //3
console.log(arr); // [1,empty * 2]
```

<br />

> 희소 배열 예제

```js
// 배열의 요소가 연속적으로 위치 하지 않고 일부가 비어있는 배열을 희소배열이라고 한다.
const sparse = [, 2, , 4];

//희소 배열의 length 프로퍼티 값은 요소와 일치 하지 않는다.
console.log(sparse.length); // 4
console.log(sparse); // [empty,2,empty,4]

//배열 sparse에는 인덱스가 0,2인 요소가 존재하지 않는다.
```

<br />
<br />
<br />

---

# 배열의 생성 방법

<br />

## 1. `배열 리터럴`

- 0개 이상의 요소를 쉼표로 구분하여 `[]`로 `묶는 방법`
  - 배열 리터럴에 요소를 생략하면 희소 배열이 생성

```js
const arr = [1, 2, 3];
consoel.log(arr); //3
//희소 배열
const arr = [1, , 3];
consoel.log(arr); // [1,empty,3]
```

<br />
<br />

## 2. `Array 생성자 함수`

- 인수의 개수에 따라 다르게 동작한다.
  - 전달된 인수가 1개 이며 숫자일 경우 : `length 프로퍼티 값이 인수인 배열을 생성`
  - 전달된 인수가 없는 경우 : `빈 배열 생성`
  - 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 : `인수를 요소로 갖는 배열을 생성`

```js
// 인수가 1개이며 정수인 경우 -> 희소 배열 생성
const arr = new Array(10);

console.log(arr); // [ <10 empty items> ]
console.log(arr.length); // 10
console.log(Object.getOwnPropertyDescriptors(arr));
// { length: { value: 10, writable: true, enumerable: false, configurable: false } }

new Array(4294967295);
new Array(4294967296); // RangeError: Invalid array length
new Array(-1); // RangeError: Invalid array length

// 인수가 없는 경우 -> 빈 배열 생성
new Array(); // []

// 인수가 2개 이상이거나 숫자가 아닌 경우 -> 인수를 요소로 갖는 배열을 생성
new Array(1, 2, 3); // [1,2,3]
new Array({}); // [{}]
```

<br />
<br />

## 3. `Array.of 메서드`

- 전달된 인수를 갖는 배열을 생성
- 인수가 1개이고 숫자여도 인수를 요소로 갖는 배열을 생성

```js
const arr1 = Array.of(1);
const arr2 = Array.of(1, 2, 3);
const arr3 = Array.of("string");

console.log(arr1); // [ 1 ]
console.log(arr2); // [ 1, 2, 3 ]
console.log(arr3); // [ 'string' ]
```

<br />
<br />

## 4. `Array.from 메서드`

- `유사배열 객체` , `이터러블 객체`를 인수로 전달 받아 배열로 변환 후 반환
  - 두 번째 인수로 함께 전달할 콜백 함수를 통해 값을 만들면서 요소를 채울 수도 있다.
  - ![image](../image/503.png)

```js
// 유사 배열 객체를 배열로 변환
const arr1 = Array.from({ length: 2, 0: "a", 1: "b" });

// 이터러블 객체를 배열로 변환
// 문자열은 "이터러블 객체"이기도 하다.
const arr2 = Array.from("Hi");

console.log(arr1); // [ 'a', 'b' ]
console.log(arr2); // [ 'H', 'i' ]
```

```
💡 유사배열객체란 마치 배열 처럼 인덱스로 `프로퍼티 값에 접근`할 수 있고, `length 프로퍼티`를 갖는 `객체`를 말한다.
```

<br />
<br />
<br />

---

# 배열 참조

- 배열을 참조할 때는 대괄호`([])` 를 사용하며, 대괄호 안에는 `인덱스` 가 와야 한다.
- `정수로 평가되는 표현식` 이라면 인덱스로 사용 가능하다.
- 존재하지 않는 요소에 접근하면 `undefined`가 반환
  - 배열은 객체 이기 때문에 객체에서 존재하지 않는 프로퍼티에 접근하면 `undefined` 를 반환하는 것과 같다.

```js
// 희소 배열
const arr = [1, , 3];

// arr 배열의 1번째 인덱스에는 요소가 존재하지 않는다.
// 하지만, length 프로퍼티는 empty 요소도 포함해서 길이를 측정한다.
// 단, 실질적인 배열 프로퍼티의 메모리 공간에는 빈 요소의 영역은 할당되지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
// {
//   '0': { value: 1, writable: true, enumerable: true, configurable: true },
//   '2': { value: 3, writable: true, enumerable: true, configurable: true },
//   length: { value: 3, writable: true, enumerable: false, configurable: false }
// }

// 존재하지 않는 요소를 참조하면 undefined
console.log(arr[1]); // undefined
console.log(arr[3]); // undefined
```

<br />
<br />
<br />

---

# 배열 요소의 추가, 갱신,삭제

## 추가 / 갱신

<br />

- 배열도 객체 이므로, 객체의 프로퍼티를 동적 으로 추가할 수 있는 것처럼 `배열에도 요소를 동적으로 추가할 수 있다`.
  - ![image](../image/5055.png)
- 현재 배열의 length 프로퍼티 값보다 `큰 인텍스`로 새로운 요소를 추가하면 `희소 배열`이 된다.
  - ![image](../image/505.png)

<br />
<br />

- `0이상 정수(또는 문자열 형태 숫자)` 로 인덱싱에 사용해야 한다
  - 만약, 정수 이외의 값을 인덱싱에 사용하면 요소가 생성되는 것이 아니라, 프로퍼티가 생성된다.
  - 프로퍼티는 length 프로퍼티 값에 영향을 주지 않는다.
  - ![image](../image/506.png)

## 삭제

<br />

- 배열도 객체이므로 `delete 연산자`를 사용할 수 있다.
  - 하지만 `delete` 연산자를 이용해서 배욜의 요소를 삭제하면 `희소 배열`이 된다.
  - 배열에서 `delete 연산자`는 `사용하지 않는 것`이 좋음
- `Array.prototype.splice` 메서드를 사용해 배열의 요소를 삭제해야함
  - `희소배열을 만들지 않음`

> Array.prototype.splice 예시

```js
const arr = [1, 2, 3];
//Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소의 수)
//arr[1]부터 1개의 요소를 제거

arr.splice(1, 1);
console.log(arr); //[1,3]

//length 프로퍼티가 자동으로 갱신된다.
console.log(arr.length); // 2
```
