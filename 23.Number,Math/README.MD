# NUMBER π―π‘π₯πβ

<br />

- `νμ€ λΉνΈμΈ κ°μ²΄` : Numberλ μμ νμ μ«μλ₯Ό λ€λ£° λ μ μ©ν `νλ‘νΌν°`, `λ©μλ`λ₯Ό μ κ³΅νλ€.
- `Number`μ μμ±μ ν¨μ κ°μ²΄μ΄κ³ , `new μ°μ°μ`μ ν¨κ» νΈμΆνλ©΄ μΈμ€ν΄μ€ μμ± κ°λ₯

<br />

- `Number`μ μΈμλ₯Ό μ λ¬νμ§ μκ³ , `new μ°μ°μ`μ ν¨κ» νΈμΆνλ©΄ `[[NumberDATA]]` λ΄λΆ μ¬λ‘―μ `0`μ ν λΉν NUMBER `λνΌ κ°μ²΄`λ₯Ό μμ± νλ€.

  - `Number` μμ±μ ν¨μμ μΈμλ‘ μ«μλ₯Ό μ λ¬νλ©΄, `[[NumberData]]` λ΄λΆ μ¬λ‘―μ μΈμλ‘ μ λ¬λ°μ μ«μλ₯Ό ν λΉν` Number λνΌ κ°μ²΄`λ₯Ό `μμ±`νλ€.

<br />

- `λͺμμ  νμ` λ³νμ μ¬μ©λκΈ°λ νλ€.
  - ![image](../image/553.png)

> `[[NumberData]]` λ΄λΆ μ¬λ‘― μμ μ½λ

```js
//Number μμ±μ ν¨μμ μΈμλ‘ μ«μκ° μλ κ°μ μ λ¬νλ©΄ μΈμλ₯Ό μ«μλ‘ κ°μ  λ³ν
//μΈμλ₯Ό μ«μλ‘ λ³ν ν  μ μλ€λ©΄ NaNλ₯Ό [[NumberData]]μ ν λΉν Number λνΌ κ°μ²΄λ₯Ό μμ±νλ€.
const numObj = new Number(10);
console.log(numObj); // Number{[[NumberData]] : 10}

const numObj2 = new Number("hoho");
console.log(numObj2); // Number{[[NumberData]] : NaN}
```

<br />
<br />
<br />

---

# Number νλ‘νΌν°

<br />
<br />

---

## Number.EPSILON (Number νλ‘νΌν°)

<br />

- `μ νν κ³μ°μ μν΄ μ¬μ©ν¨`
- `1κ³Ό 1λ³΄λ€ ν° μ«μ μ€μμ κ°μ₯ μμ μ«μμμ μ°¨μ΄μ κ°λ€.`
- μ½ `2.2204460492503130808472633361816 * 10^-16`
- μ΄ νλ‘νΌν°λ `λΆλμμμ  μ°μ μ μ€μ°¨ λ¬Έμ μ μν μ νν κ³μ°` μ `μν΄` μ¬μ©νλ€.

<br />

> λΆλ μμ«μ  μ°μ°μ μ νν κ²°κ³Όλ₯Ό κΈ°λ νκΈ° μ΄λ €μ

```js
0.1 + 0.2; //0.300000000000000000004
0.1 + 0.2 === 0.3; // false
//EPSILONμ λΆλ μμμ μΌλ‘ μΈν΄ λ°μνλ μ€μ°¨λ₯Ό ν΄κ²°νκΈ° μν΄ μ¬μ©νλ€.
function exactIsEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(exactIsEqual(0.1 + 0.2, 0.3)); // true
console.log(0.1 + 0.2 === 0.3); // false
```

<br />
<br />
<br />

---

## Number.MAX_VALUE (Number νλ‘νΌν°)

- μλ°μ€ν¬λ¦½νΈμμ ννν  μ μλ κ°μ₯ μμ μμ`(5 * 10^-324)`
- `Infinity > Number.MAX_VALUE`

<br />

> μμ μ½λ

```js
console.log(Number.MIN_VALUE); // 5e-324
console.log(0 < Number.MIN_VALUE); // true
```

<br />
<br />
<br />

---

## Number.MIN_VALUE (Number νλ‘νΌν°)

- μλ°μ€ν¬λ¦½νΈμμ ννν  μ μλ κ°μ₯ `μμ μμ(5 * 10^-324)`
- `0 < Number.MIN_VALUE`

<br />

> μμ μ½λ

```js
console.log(Number.MIN_VALUE); // 5e-324
console.log(0 < Number.MIN_VALUE); // true
```

<br />
<br />
<br />

---

## Number.MAX_SAFE_INTEGER (Number νλ‘νΌν°)

- μλ°μ€ν¬λ¦½νΈμμ `μμ `νκ² ννν  μ μλ `κ°μ₯ ν° μ μκ°(9007199254740991)`

<br />

> μμ μ½λ

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```

<br />
<br />
<br />

---

## Number.MIN_SAFE_INTEGER (Number νλ‘νΌν°)

- μλ°μ€ν¬λ¦½νΈμμ μμ νκ² ννν  μ μλ κ°μ₯ `μμ μ μκ°(-9007199254740991)`

<br />

> μμ μ½λ

```js
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

<br />
<br />
<br />

---

## Number.POSITIVE_INFINITY (Number νλ‘νΌν°)

- μμ λ¬΄νλλ₯Ό λνλ΄λ `Infinity`μ κ°λ€.

<br />

> μμ μ½λ

```js
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.POSITIVE_INFINITY === Infinity); // true
```

<br />
<br />
<br />

---

## Number.NEGATIVE_INFINITY (Number νλ‘νΌν°)

- μμ λ¬΄νλλ₯Ό λνλ΄λ `-Infinity`μ κ°λ€.

<br />

> μμ μ½λ

```js
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.NEGATIVE_INFINITY === -Infinity); // true
```

<br />
<br />
<br />

---

## Number.NEGATIVE_INFINITY (Number νλ‘νΌν°)

- μ«μκ° μλ(Not-a-Number)μ λνλ΄λ μ«μ κ° `NaN`
- `Number.NaN == window.NaN`

<br />

> μμ μ½λ

```js
console.log(Number.NaN); // NaN
```

<br />
<br />
<br />

<br />
<br />
<br />

---

# Number λ©μλ

<br />
<br />

---

## Number.isFinite (Number λ©μλ)

- μΈμλ‘ μ λ¬λ μ«μκ°μ΄ μ μμ μΈ μ νμ, μ¦ `Infinity` λλ `-Infinity` κ° μλμ§ `κ²μ¬`, κ²°κ³Ό κ°μΌλ‘ `boolean` λ°ν
- μλ¬΅μ  νμ λ³νμ νμ§ μλλ€.
  - μΈμκ° NaNμ΄λ©΄ μΈμ λ `false`λ₯Ό λ°ννλ€.

<br />

> μ½λ μμ

```js
console.log(Number.isFinite(0)); // true
console.log(Number.isFinite(Number.MAX_VALUE)); // true
console.log(Number.isFinite(Number.MIN_VALUE)); // true

console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(-Infinity)); // false

console.log(Number.isFinite(NaN)); // false

console.log(Number.isFinite(null)); // false

console.log(isFinite(null)); // true
```

<br />
<br />
<br />

---

## Number.isInteger (Number λ©μλ)

- μΈμλ‘ μ λ¬λ μ«μκ°μ΄ `μ μ`μΈμ§ κ²μ¬νμ¬ κ²°κ³Όλ₯Ό `boolean`κ°μΌλ‘ λ°ν
- κ²μ¬μ  μλ¬΅μ  νμλ³νμ νμ§ μλλ€.

<br />

> μ½λ μμ

```js
console.log(Number.isInteger(0)); // true
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(-123)); // true

console.log(Number.isInteger(0.1)); // false

console.log(Number.isInteger("123")); // false

console.log(Number.isInteger(false)); // false

console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger(Number.MAX_SAFE_INTEGER)); // true
```

<br />
<br />
<br />

---

## Number.isNaN (Number λ©μλ)

- μΈμλ‘ μ λ¬λ μ«μκ°μ΄ NaNμΈμ§ κ²μ¬ν΄μ κ·Έκ²°κ³Όλ₯Ό `boolean`κ°μΌλ‘ `λ°ν`νλ€.
- μλ¬΅μ  νμ λ³νμ νμ§ μλλ€.

```
π₯ Number.isNaN VS λΉνΈμΈ μ μ­ ν¨μ isNaN
π₯ λΉνΈμΈ μ μ­ ν¨μ isNaN :  μ λ¬λ°μ μΈμλ₯Ό μ«μλ‘ μλ¬΅μ  νμ λ³ν
π₯ Number.isNaN : μ λ¬λ°μ μΈμλ₯Ό μ«μλ‘ μλ¬΅μ  νμ λ³ν X.X
```

<br />

> μ½λ μμ

```js
console.log(Number.isNaN(NaN)); // true

console.log(Number.isNaN(undefined)); // false

console.log(isNaN(undefined)); // true
```

<br />
<br />
<br />

---

## Number.isSafeInteger (Number λ©μλ)

- μΈμλ‘ μ λ¬λ μ«μκ°μ΄ μμ ν μ μμΈμ§ κ²μ¬ ν `Booleanκ°μΌλ‘` `λ°ν`
- μλ¬΅μ  νμ λ³νμ νμ§ μλλ€.

<br />

> μ½λ μμ

```js
console.log(Number.isSafeInteger(0)); // true

console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false

console.log(Number.isSafeInteger(1.1)); // false

console.log(Number.isSafeInteger("123")); // false

console.log(Number.isSafeInteger(false)); // false

console.log(Number.isSafeInteger(Infinity)); // false
```

<br />
<br />
<br />

---

## Number.toExponential (Number λ©μλ)

- μ«μλ₯Ό μ§μ νκΈ°λ²μΌλ‘ λ³νν΄μ λ¬Έμμ΄λ‘ λ°ννλ€.

  - `μ§μ νκΈ°λ²` : λ§€μ° ν¬κ±°λ μμ μ«μλ²μ λνλΌλ μ£Όμ μ¬μ© e μμ μλ μ«μμ 10μ nμΉμ κ³±νλ νμμΌλ‘ μλ₯Ό λνλ΄λ λ°©λ²μ΄λ€.

- μ μλ₯Ό κΈ°μ€μΌλ‘ νΈμΆν  κ²½μ° β `μλ¬ λ°μ`
- μ μ λ€μ λ§μΉ¨ν(.)μ°μ°μ΄ λΆλμμμ μ λ§μΉ¨νμΈμ§ λ©μλ νΈμΆμ νμν λ§μΉ¨νμΈμ§, μλ°μ€ν¬λ¦½νΈ μμ§ μμ₯μμλ μ λ§€λͺ¨νΈν΄μ λ°μνλ μλ¬
- λ°λΌμ, μ μ κΈ°μ€μΌλ‘ toExponential λ©μλ νΈμΆμ `κ·Έλ£Ή μ°μ°μ(())`λ₯Ό μ¬μ©ν  κ²

<br />

> μμ μ½λ

```js
console.log(77.toExponential());  // SyntaxError: Invalid or unexpected token
console.log((77).toExponential()); // 7.7e+1

console.log((77.1234).toExponential(3)); // 7.712e+1
console.log((77.1234).toExponential(1)); // 7.7e+1
```

<br />
<br />
<br />

---

## Number.toFixed (Number λ©μλ)

- μ«μλ₯Ό `λ°μ¬λ¦Ό` νμ¬ λ¬Έμμ΄λ‘ λ°ννλ€.
  - λ°μ¬λ¦Όν  μμμ  μλ¦¬μ`(0~20κΉμ§μ μ μ)`λ₯Ό `μΈμ`λ‘ μ λ¬
  - μΈμμ `κΈ°λ³Έκ°`μ `0` μ΄λ€.

<br />

> μμ μ½λ

```js
console.log((12345.6789).toFixed()); // 12346
console.log((12345.6789).toFixed(1)); // 12345.7
console.log((12345.6789).toFixed(2)); // 12345.68
console.log((12345.6789).toFixed(3)); // 12345.679
```

<br />
<br />
<br />

---

## Number.toPrecision (Number λ©μλ)

- μΈμλ‘ μ λ¬λ°μ μ μ²΄ μλ¦¬μκΉμ§ μ ν¨νλλ‘ `λλ¨Έμ§ μλ¦¬μ`λ₯Ό `λ°μ¬λ¦Ό`νμ¬ `λ¬Έμμ΄`λ‘ λ°ν
- μΈμλ‘ μ λ¬λ°μ μ μ²΄ μλ¦Ώμλ‘ ννν  μ μλ κ²½μ°, `μ§μ νκΈ°λ²`μΌλ‘ `κ²°κ³Ό`λ₯Ό λ°ν
  - μ μ²΄ μλ¦¬μλ₯Ό λνλ΄λ μ(0~21 μ¬μ΄μ μ μκ°)λ₯Ό μΈμλ‘ μ λ¬
  - μΈμλ₯Ό μλ΅ν  κ²½μ°, κΈ°λ³Έκ°μ 0 μ΄λ€.

<br />

> μμ μ½λ

```js
console.log((12345.6789).toPrecision()); // 12345.6789
console.log((12345.6789).toPrecision(1)); // 1e+4
console.log((12345.6789).toPrecision(2)); // 1.2e+4
console.log((12345.6789).toPrecision(6)); // 12345.7
```

<br />
<br />
<br />

---

## Number.toPrecision (Number λ©μλ)

<br />

- μ«μλ₯Ό λ¬Έμμ΄λ‘ λ³ννμ¬ λ°ν
- μ§λ²μ λνλ΄λ `μ μ`(2~36 μ¬μ΄μ μ μ)μΈ `κΈ°μ`λ₯Ό `μΈμ`λ‘ μ λ¬κ°λ₯
  - μΈμλ₯Ό μλ΅ν  κ²½μ° `κΈ°λ³Έκ° 10μ§μ`

<br />

- μ μ­ ν¨μμΈ parseInt λ‘λ nμ§μ λ¬Έμμ΄μ nμ§μ μ μλ‘ λ³ν κ°λ₯
  - μΈμλ₯Ό μλ΅ν  κ²½μ° `κΈ°λ³Έκ° 10μ§μ`

<br />

> μμ μ½λ

```js
console.log((16).toString()); // '16'    μ­μ§μ μ μ 16 -> 10μ§μ 16 λ¬Έμμ΄λ‘ λ³ν
console.log((16).toString(2)); // '10000'  μ­μ§μ μ μ 16 -> 2μ§μ 10000 λ¬Έμμ΄λ‘ λ³ν
console.log((16).toString(8)); // '20'     μ­μ§μ μ μ 16 -> 8μ§μ 20 λ¬Έμμ΄λ‘ λ³ν
console.log((16).toString(16)); // '10'    μ­μ§μ μ μ 16 -> 16μ§μ 10 λ¬Έμμ΄λ‘ λ³ν
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

# Math π―π‘π₯πβ

- νμ€ λΉνΈμΈ κ°μ²΄μΈ `Math`λ μνμ μΈ μμμ ν¨μλ₯Ό μν `νλ‘νΌν°`μ `λ©μλ`λ₯Ό μ κ³΅νλ€.
- `Math` μμ±μ ν¨μκ° μλλ©°, `μ μ  νλ‘νΌν°`μ `μ μ  λ©μλ`λ§ μ κ³΅νλ€.

<br />
<br />
<br />

---

## Math.PI (Math νλ‘νΌν°)

- μμ£Όμ¨ PIκ° μ λ°ννλ€.

<br />

> μμ  μ½λ

```js
console.log(Math.PI); // 3.141592653589793
```

<br />
<br />
<br />

---

## Math.abs (Math νλ‘νΌν°)

- μΈμλ‘ μ λ¬λ μ«μμ `μ λκ°`μ `λ°ν`
- μ λκ°μ λ°λμ `0` λλ `μμ`μ¬μΌ νλ€.

<br />

> μμ  μ½λ

```js
console.log(Math.abs(-1)); // 1
console.log(Math.abs("-1")); // 1
console.log(Math.abs("")); // 0
console.log(Math.abs([])); // 0
console.log(Math.abs(null)); // 0
console.log(Math.abs(undefined)); // NaN
console.log(Math.abs({})); // NaN
console.log(Math.abs("string")); // NaN
console.log(Math.abs()); // NaN
```

<br />
<br />
<br />

---

## Math.round (Math νλ‘νΌν°)

- μΈμλ‘ μ λ¬λ μ«μμ μμμ  μ΄νλ₯Ό `λ°μ¬λ¦Ό`ν `μ μ`λ₯Ό `λ°ν`νλ€.

  <br />

> μμ  μ½λ

```js
console.log(Math.round(1.4)); // 1
console.log(Math.round(1.5)); // 2
console.log(Math.round(-1.4)); // -1
console.log(Math.round(-1.5)); // -1
console.log(Math.round(-1.6)); // -2
console.log(Math.round()); // NaN
```

<br />
<br />
<br />

---

## Math.ceil (Math νλ‘νΌν°)

- μΈμλ‘ μ λ¬λ μ«μμ μμμ  μ΄νλ₯Ό μ¬λ¦Όν μ μλ₯Ό λ°ννλ€.
  - μμμ  μ΄νλ₯Ό μ¬λ¦Όνλ©΄ λ `ν° μ μ`κ° λλ€.
  - ex) 1.4 -> 2 , -1.4 -> -1

<br />

> μμ  μ½λ

```js
console.log(Math.ceil(1.4)); // 2
console.log(Math.ceil(1.5)); // 2
console.log(Math.ceil(-1.4)); // -1
console.log(Math.ceil(-1.5)); // -1
console.log(Math.ceil(-1.6)); // -1
console.log(Math.ceil()); // NaN
```

<br />
<br />
<br />

---

## Math.floor (Math νλ‘νΌν°)

- μΈμλ‘ μ λ¬λ μ«μμ μμμ  μ΄νλ₯Ό `λ΄λ¦Όν μ μ`λ₯Ό `λ°ν`νλ€.
- μμμ  μ΄νλ₯Ό λ΄λ¦Όνλ©΄ λ μμ μ μκ° λλ€.
  - ex) 1.9 -> 1 , -1.9 -> -2

<br />

> μμ  μ½λ

```js
console.log(Math.floor(1.9)); // 1
console.log(Math.floor(1.9999)); // 1
console.log(Math.floor(-1.1)); // -2
console.log(Math.floor(-1.9)); // -2
console.log(Math.floor()); // NaN
```

<br />
<br />
<br />

---

## Math.sqrt (Math νλ‘νΌν°)

- μΈμλ‘ μ λ¬λ μ«μμ μ κ³±κ·Όμ λ°ννλ€.

<br />

> μμ  μ½λ

```js
console.log(Math.sqrt(9)); // 3
console.log(Math.sqrt(4)); // 2
console.log(Math.sqrt(2)); // 1.4142135623730951
console.log(Math.sqrt(1)); // 1
console.log(Math.sqrt(0)); // 0
console.log(Math.sqrt()); // NaN
```

<br />
<br />
<br />

---

## Math.random (Math νλ‘νΌν°)

- μμμ `λμ`λ₯Ό λ°ννλ€.
  - λ°νν λμλ `0~1 λ―Έλ§μ μ€μ` μ΄λ€. (1μ ν¬ν¨λμ§ μλλ€.)

<br />

> μμ  μ½λ

```js
// 0 ~ 1 μ¬μ΄μ λλ€ μ€μ
console.log(Math.random());

// n ~ m μ¬μ΄μ λλ€ μ μ λ½λ λ‘μ§ (ex. 1 ~ 10 μ¬μ΄μ λλ€ μ μ)
const random = Math.floor(Math.random() * 10 + 1);
console.log(random);
```

<br />
<br />
<br />

---

## Math.pow (Math νλ‘νΌν°)

- μ²« λ²μ§Έ μΈμλ₯Ό λ°μΌλ‘, λ λ²μ§Έ μΈμλ₯Ό μ§μλ‘ κ±°λ­μ κ³±ν κ²°κ³Όλ₯Ό λ°ννλ€.

  - λκ°μ μΈμλ₯Ό λ°μ

    - μ²«λ²μ§Έ μΈμ : λ°
    - λλ²μ§Έ μΈμ : μ§μ

      <br />

- μ§μ μ°μ°μλ₯Ό μ¬μ©νλ©΄ λ κ°λμ±μ΄ μ’λ€

<br />

> μμ  μ½λ

```js
console.log(Math.pow(2, 1)); // 2
console.log(Math.pow(2, 4)); // 16
console.log(Math.pow(2, 6)); // 64
console.log(Math.pow(2, -1)); // 0.5
console.log(Math.pow(2)); // NaN

// ES7μ μ§μ μ°μ°μ
console.log(2 ** 1); // 2
console.log(2 ** 4); // 16
console.log(2 ** 6); // 64
console.log(2 ** -1); // 0.5
console.log(2); // NaN
```

<br />
<br />
<br />

---

## Math.max (Math νλ‘νΌν°)

- μ λ¬ λ°μ μΈμμ€μμ `κ°μ₯ ν° μ`λ₯Ό λ°ννλ€.
  - μΈμκ° μ λ¬λμ§ μμΌλ©΄ `-Infinity` λ°ν
- λ°°μ΄ μμ μ€μμ μ΅λκ°μ κ΅¬νκΈ° μν΄μ
  - `Function.prototype.apply` λ©μλ μ¬μ©
  - `μ€νλ λ λ¬Έλ²`μ μ¬μ© ν΄μΌ νλ€.

<br />

> μμ  μ½λ

```js
console.log(Math.max(1)); // 1
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.max()); // -Infinity

// λ°°μ΄ μμλ€ μ€ μ΅λκ° λ½λ λ‘μ§
const arr = [1, 4, 2, 7, 5];
console.log(Math.max(...arr)); // 7
console.log(Math.max.apply(null, arr)); // 7
```

<br />
<br />
<br />

---

## Math.min (Math νλ‘νΌν°)

- μ λ¬ λ°μ μΈμμ€μμ `κ°μ₯ μμ μ`λ₯Ό λ°ννλ€.
  - μΈμκ° μ λ¬λμ§ μμΌλ©΄ `Infinity`λ₯Ό λ°ννλ€.
- λ°°μ΄ μμ μ€μμ μ΅μκ°μ κ΅¬νκΈ° μν΄μ
  - `Function.prototype.apply` λ©μλ μ¬μ©
  - `μ€νλ λ λ¬Έλ²`μ μ¬μ© ν΄μΌ νλ€.

<br />

> μμ  μ½λ

```js
console.log(Math.min(1)); // 1
console.log(Math.min(1, 2, 3)); // 1
console.log(Math.min()); // Infinity

// λ°°μ΄ μμλ€ μ€ μ΅λκ° λ½λ λ‘μ§
const arr = [1, 4, 2, 7, 5];
console.log(Math.min(...arr)); // 1
console.log(Math.min.apply(null, arr)); // 1
```
