# Date κ°μ²΄π―π‘π₯πβ

- `νμ€ λΉνΈμΈ κ°μ²΄`μΈ Dateλ λ μ§μ μκ°μ μν λ©μλλ₯Ό μ κ³΅νλ λΉ`νΈμΈ κ°μ²΄`μ΄λ©΄μ `μμ±μ ν¨μ`μ΄λ€.
- UTCλ `κ΅­μ²΄ νμ€μ`λ₯Ό λ§νλ€.
  - KSTλ UTCμ `9μκ°`μ `λν μκ°`μ΄λ€.
  - μ¦ KSTλ UTCλ³΄λ€ `9μκ°`μ΄ λΉ λ₯΄λ€.

<br />
<br />
<br />

---

# Date μμ±μ ν¨μ

- `Date`λ μμ±μ ν¨μμ΄λ€.
  - `Date`μμ±μ ν¨μλ‘ μμ±ν Date κ°μ²΄λ λ΄λΆμ μΌλ‘ λ μ§μ μκ°μ λνλ΄λ `μ μκ°`μ κ°μ§λ€.
- `λͺ¨λ  μκ° μμ `μ UTC κ΅­μ  νμ€μ`(1970λ 1μ 1μΌ 00:00:00)`λ₯Ό κΈ°μ€μΌλ‘ νλ€.
  - νλ£¨λ `86,400,000(24h * 60m * 60s * 1000ms)ms`μ κ°λλ€.
- Date μμ±μ ν¨μλ‘ κ°μ²΄λ₯Ό μμ±νλ `4κ°μ§`κ° μ‘΄μ¬νλ€.

<br />
<br />
<br />

---

## μ²«λ²μ§Έ new Date()

- Date μμ±μ ν¨μλ₯Ό μΈμ μμ΄ `new μ°μ°μ`μ ν¨κ» νΈμΆνλ©΄ `νμ¬ λ μ§`μ `μκ°`μ κ°μ§λ `Date κ°μ²΄`λ₯Ό λ°ννλ€.
  - `Date`κ°μ²΄λ λ΄λΆμ μΌλ‘ λ μ§μ μκ°μ λνλ΄λ `μ μκ°`μ κ°μ§λ§, μΆλ ₯νλ©΄ κΈ°λ³Έμ μΌλ‘ `λ μ§`μ `μκ° μ λ³΄`λ₯Ό μΆλ ₯νλ€.
- Date μμ±μ ν¨μλ₯Ό `new μ°μ°μ μ`μ΄ νΈμΆνλ©΄ Date κ°μ²΄λ₯Ό λ°ννμ§ μκ³  λ μ§μ `μκ°μ λνλ΄λ λ¬Έμμ΄`μ `λ°ν`νλ€.

<br />

> μμ μ½λ

```js
console.log(new Date(), typeof new Date()); // Tue Jan 04 2022 22:43:51 GMT+0900 (νκ΅­ νμ€μ) object
console.log(Date(), typeof Date()); // Tue Jan 04 2022 22:44:45 GMT+0900 (λνλ―Όκ΅­ νμ€μ) string
```

<br />
<br />
<br />

---

## λλ²μ§Έ new Date(dataString)

- Date μμ±μ ν¨μμ `λ μ§`μ `μκ°`μ λνλ΄λ λ¬Έμμ΄μ `μΈμλ‘ μ λ¬`
  - μ λ¬ν λ¬Έμμ΄μ `Date.parse`μ μν΄ ν΄μμ΄ κ°λ₯ν΄μΌνλ€.
  - μ§μ λ `λ μ§`μ `μκ°`μ λνλ΄λ `Date κ°μ²΄`λ₯Ό `λ°ν`νλ€.

<br />

> μμ μ½λ

```js
console.log(new Date("Jan 01, 2022 13:00:00")); // Sat Jan 01 2022 13:00:00 GMT+0900 (νκ΅­ νμ€μ)
console.log(new Date("2022/01/01/13:00:00")); // Sat Jan 01 2022 13:00:00 GMT+0900 (νκ΅­ νμ€μ)
```

<br />
<br />
<br />

---

## μΈλ²μ§Έ new Date(milliseconds)

- Date μμ±μ ν¨μμ `μ«μ νμ`μ λ°λ¦¬μ΄λ₯Ό `μΈμλ‘ μ λ¬`
  - `(1970λ 1μ 1μΌ 00:00:00)`UTCλ₯Ό κΈ°μ μΌλ‘ μΈμλ‘ μ λ¬λ λ°λ¦¬μ΄λ§νΌ κ²½κ³Όν `λ μ§`μ `μκ°`μ λνλ΄λ `Date κ°μ²΄`λ₯Ό λ°ννλ€.

<br />

> μμ μ½λ

```js
console.log(new Date(0)); // Thu Jan 01 1970 09:00:00 GMT+0900 (νκ΅­ νμ€μ)
console.log(new Date(86400000)); // Thu Jan 02 1970 09:00:00 GMT+0900 (νκ΅­ νμ€μ)
```

<br />
<br />
<br />

---

## λ€λ²μ§Έ new Date(year, month[,day, hour, minute, second, milliseconds])

- Date μμ±μ ν¨μμ μ°,μ,μΌ,μ,λΆ,μ΄,λ°λ¦¬μ΄λ₯Ό μλ―Ένλ μ«μλ₯Ό `μΈμ`λ‘ `μ λ¬`
  - `λ,μ`μ `νμκ°`
  - μ§μ λ `λ μ§μ μκ°`μ λνλ΄λ `Date κ°μ²΄`λ₯Ό `λ°ν`νλ€.
    - μ§μ λμ§ μμ μ΅μμ `0` or `1`λ‘ μ΄κΈ°ν λλ€.
    - ![image](../image/568.png)

<br />

> μμ μ½λ

```js
console.log(new Date(2022, 1)); // Tue Feb 01 2022 00:00:00 GMT+0900 (νκ΅­ νμ€μ)
console.log(new Date(2022, 1, 4, 22, 0, 0)); // Fri Feb 04 2022 22:00:00 GMT+0900 (νκ΅­ νμ€μ)
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

---

# Date λ©μλ

<br />

```
π Date κ°μ²΄μ λ€μν `λ©μλ`
```

<br />
<br />
<br />

## Date.now (Date λ©μλ δΈ­ 1)

- `(1970λ 1μ 1μΌ 00:00:00)`μ κΈ°μ μΌλ‘ `νμ¬ μκ°κΉμ§ κ²½κ³Όν λ°λ¦¬μ΄`λ₯Ό μ«μλ‘ λ°ν

<br />

> μμ  μ½λ

```js
const now = Date.now(); // 15939231232112
new Date(now); // Mon Jul 06 2020 02:52:19 GMT+0900(λνλ―Όκ΅­νμ€μ)
```

<br />
<br />
<br />

## Date.PARSE (Date λ©μλ δΈ­ 1)

- `(1970λ 1μ 1μΌ 00:00:00)`μ κΈ°μ μΌλ‘ μΈμλ‘ μ λ¬λ μ§μ μκ°(n`ew Date()μ μΈμμ λμΌν νμ`)κΉμ§μ λ°λ¦¬μ΄λ₯Ό `μ«μλ‘ λ°ν`

<br />

> μμ  μ½λ

```js
console.log(Date.parse("Jan 2, 1970 00:00:00 UTC")); // 8640000 (UTC κΈ°μ€)
console.log(Date.parse("Jan 2, 1970 09:00:00")); // 8640000 (KST κΈ°μ€)
console.log(Date.parse("1970/01/02/09:00:00")); // 8640000 (KST κΈ°μ€)
```

<br />
<br />
<br />

## Date.UTC (Date λ©μλ δΈ­ 1)

- `(1970λ 1μ 1μΌ 00:00:00)`μ¦ UTCμ μ§μ μΌλ‘ μΈμλ‘ μ λ¬λ μ§μ  μκ°κΉμ§μ `λ°λ¦¬μ΄λ₯Ό μ«μ`λ‘ `λ°ν`νλ€.
- μΈμλ `new Date(year, month[, day, hour, minute, second, millisecond])`μ κ°μ νμμ΄μ΄μΌ νλ€.

<br />

> μμ  μ½λ

```js
console.log(Date.UTC(1970, 0, 2)); // 86400000
console.log(Date.UTC("1970/1/2")); // NaN
```

<br />
<br />
<br />

## Date.prototype.getFullYear (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ `μ°λ`λ₯Ό λνλ΄λ μ μλ₯Ό λ°ννλ€.

<br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04").getFullYear()); // 2022
```

<br />
<br />
<br />

## Date.prototype.setFullYear (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μ°λλ₯Ό λνλ΄λ `μ μλ₯Ό μ€μ `νλ€.
  - μ°λ μ΄μΈμ μ΅μμΌλ‘ `μ,μΌ`λ `μ€μ μ΄ κ°λ₯`νλ€.

<br />

> μμ  μ½λ

```js
const today = new Date();

today.setFullYear(2022);
console.log(today.getFullYear()); // 2022

today.setFullYear(2021, 1, 14);
console.log(today.getFullYear()); // 2021
```

<br />
<br />
<br />

## Date.prototype.getMonth (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μμ μμ λνλ΄λ `0~11`μ μ μλ₯Ό λ°ννλ€.
  - `1μ = 0 , 12μ 11`

<br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04").getMonth()); // 0 (μ¦, μ€μ λ 1μ)
```

<br />
<br />
<br />

## Date.prototype.setMonth (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μμ λνλ΄λ `0~11`μ μ μλ₯Ό μ€μ νλ€.
  - μ μ΄μΈμ `μΌ(day)`λ μ€μ κ°λ₯νλ€.

<br />

> μμ  μ½λ

```js
const today = new Date();

today.setMonth(3);
console.log(today.getMonth()); // 3 (μ€μ λ 4μ)

today.setMonth(5, 1);
console.log(today.getMonth()); // 5 (μ€μ λ 6μ)
```

<br />
<br />
<br />

## Date.prototype.getDate (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ λ μ§ `1~31`λ₯Ό λνλ΄λ μ μλ₯Ό λ°ννλ€.

<br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04").getDate()); // 4
```

<br />
<br />
<br />

## Date.prototype.setDate (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ λ μ§ `1~31`λ₯Ό λνλ΄λ `μ μλ₯Ό μ€μ `νλ€.

<br />

> μμ  μ½λ

```js
const today = new Date();

today.setDate(30);
console.log(today.getDate()); // 30
```

<br />
<br />
<br />

## Date.prototype.getDay (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μμΌ`(0~6)`μ λνλ΄λ μ μλ₯Ό λ°ννλ€.
- λ°νκ°μ λ€μμ¬μ§κ³Ό κ°λ€.
  - ![image](../image/571.png)

<br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04").getDay()); // 2 (νμμΌ)
```

<br />
<br />
<br />

## Date.prototype.getHours (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μκ°`(0~23)`μ λνλ΄λ μ μλ₯Ό λ°ννλ€.

<br />

> μμ  μ½λ

```js
// μκ° λͺμνμ§ μμ κ²½μ° -> default λ λͺ¨λ 0
console.log(new Date("2022/01/04").getHours()); // 0

// μκ° λͺμ
console.log(new Date("2022/01/04/23:00").getHours()); // 23
```

<br />
<br />
<br />

## Date.prototype.setHours (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μκ°`(0~23)`μ λνλ΄λ μ μλ₯Ό `μ€μ `νλ€.
  - `λΆ,μ΄,λ°λ¦¬μ΄`λ μ€μ μ΄ κ°λ₯νλ€.

<br />

> μμ  μ½λ

```js
const today = new Date();

today.setHours(23);
console.log(today.getHours()); // 23

today.setHours(0, 0, 0, 0); // μ,λΆ,μ΄,λ°λ¦¬μ΄ μ
console.log(today.getHours()); // 0
```

<br />
<br />
<br />

## Date.prototype.getMinutes (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ λΆ`(0~59)`μ λνλ΄λ μ μλ₯Ό `λ°ν`νλ€.

<br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04/12:34:56").getMinutes()); // 34
```

<br />
<br />
<br />

## Date.prototype.setMinutes (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ λΆ`(0~59)`μ λνλ΄λ μ μλ₯Ό `μ€μ `νλ€.
  - μ΄μΈμ `μ΄,λ°λ¦¬μ΄ μ€μ κ°λ₯`

<br />

> μμ  μ½λ

```js
const today = new Date();

today.setMinutes(34);
console.log(today.getMinutes()); // 34

today.setMinutes(34, 0); // λΆ,μ΄,λ°λ¦¬μ΄ μ
console.log(today.getMinutes()); // 34
```

<br />
<br />
<br />

## Date.prototype.getSeconds (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μ΄`(0~59)`μ λνλ΄λ μ μλ₯Ό `λ°ν`νλ€.

<br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04/12:34:56").getSeconds()); // 56
```

<br />
<br />
<br />

## Date.prototype.setSeconds (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ μ΄(0 ~ 59)λ₯Ό λνλ΄λ μ μλ₯Ό μ€μ 

<br />

> μμ  μ½λ

```js
const today = new Date();

today.setSeconds(56);
console.log(today.getSeconds()); // 56

today.setSeconds(56, 0); // μ΄,λ°λ¦¬μ΄ μ
console.log(today.getSeconds()); // 56
```

<br />
<br />
<br />

## Date.prototype.getMilliseconds (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ λ°λ¦¬μ΄(0 ~ 999)λ₯Ό λνλ΄λ μ μλ₯Ό λ°ν
  <br />

> μμ  μ½λ

```js
console.log(new Date("2022/01/04/12:34:56:789").getMilliseconds()); // 789
```

<br />
<br />
<br />

## Date.prototype.setMilliseconds (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- Date κ°μ²΄μ λ°λ¦¬μ΄(0 ~ 999)λ₯Ό λνλ΄λ μ μλ₯Ό μ€μ 

  <br />

> μμ  μ½λ

```js
const today = new Date();

today.setMilliseconds(789);
console.log(today.getMilliseconds()); // 789
```

<br />
<br />
<br />

## Date.prototype.setTime (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- UTCλ₯Ό κΈ°μ μΌλ‘ κ²½κ³Όλ λ°λ¦¬μ΄λ₯Ό μ€μ 

  <br />

> μμ  μ½λ

```js
const today = new Date();

today.setTime(86400000);
console.log(today.getTime(), today); // 86400000 Fri Jan 02 1970 09:00:00 GMT+0900 (νκ΅­ νμ€μ)
```

<br />
<br />
<br />

## Date.prototype.getTimezoneOffset (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- UTCμ Date κ°μ²΄μ μ§μ λ λ‘μ»¬ μκ°κ³Όμ μ°¨μ΄λ₯Ό λΆ λ¨μλ‘ λ°ν
- UTC = KST - 9h

<br />

> μμ  μ½λ

```js
const today = new Date();

console.log(today.getTimezoneOffset() / 60); // -9 (UTC = KST - 9h λ₯Ό μλ―Έ)
```

<br />
<br />
<br />

## Date.prototype.toDateString λ©μλ (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- μ¬λμ΄ μ½μ μ μλ νμμ λ¬Έμμ΄λ‘ Date κ°μ²΄μ λ μ§λ₯Ό λ°ν

<br />

> μμ  μ½λ

```js
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (λνλ―Όκ΅­ νμ€μ)
console.log(today.toDateString()); // Tue Jan 04 2022
```

<br />
<br />
<br />

## Date.prototype.toTimeString λ©μλ (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- μ¬λμ΄ μ½μ μ μλ νμμ λ¬Έμμ΄λ‘ Date κ°μ²΄μ μκ°μ λ°ν

<br />

> μμ  μ½λ

```js
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (λνλ―Όκ΅­ νμ€μ)
console.log(today.toTimeString()); // 23:12:00 GMT+0900 (λνλ―Όκ΅­ νμ€μ)
```

<br />
<br />
<br />

## Date.prototype.toISOString λ©μλ (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- ISOνμ(YYYY-MM-DDTHH:MM:SS.SSSZ)μΌλ‘ Date κ°μ²΄μ λ μ§μ μκ°μ ννν λ¬Έμμ΄μ λ°ν

<br />

> μμ  μ½λ

```js
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (λνλ―Όκ΅­ νμ€μ)
console.log(today.toISOString()); // 2022-01-04T14:12:00.000Z
```

<br />
<br />
<br />

## Date.prototype.toLocaleString λ©μλ (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- μΈμλ‘ μ λ¬ν λ‘μ»¬μ κΈ°μ€μΌλ‘ Date κ°μ²΄μ λ μ§μ μκ°μ ννν λ¬Έμμ΄μ λ°ν
- μΈμλ₯Ό μλ΅ν κ²½μ°, λΈλΌμ°μ κ° λμ μ€μΈ μμ€νμ λ‘μ»¬μ μ μ©

<br />

> μμ  μ½λ

```js
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (λνλ―Όκ΅­ νμ€μ)
console.log(today.toLocaleString()); // 2022. 1. 4. μ€ν 11:12:00
console.log(today.toLocaleString("ko-KR")); // 2022. 1. 4. μ€ν 11:12:00
console.log(today.toLocaleString("en-US")); // 1/4/2022, 11:12:00 PM
console.log(today.toLocaleString("ja-JP")); // 2022/1/4 23:12:00
```

<br />
<br />
<br />

## Date.prototype.toLocaleTimeString λ©μλ (Date νλ‘ν νμ λ©μλ δΈ­ 1)

- μΈμλ‘ μ λ¬ν λ‘μ»¬μ κΈ°μ€μΌλ‘ Date κ°μ²΄μ μκ°μ ννν λ¬Έμμ΄μ λ°ν
- μΈμ μλ΅μ, λΈλΌμ°μ κ° λμ μ€μΈ μμ€νμ λ‘μ»¬μ μ μ©

<br />

> μμ  μ½λ

```js
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (λνλ―Όκ΅­ νμ€μ)
console.log(today.toLocaleTimeString()); // μ€ν 11:12:00
console.log(today.toLocaleTimeString("ko-KR")); // μ€ν 11:12:00
console.log(today.toLocaleTimeString("en-US")); // 11:12:00 PM
console.log(today.toLocaleTimeString("ja-JP")); // 23:12:00
```

<br />
<br />
<br />

---

# Dateλ₯Ό νμ©ν μκ³ μμ  μ½λ

- νμ¬ λ μ§μ μκ°μ μ΄ λ¨μλ‘ λ°λ³΅ μΆλ ₯νλ μμ 

<br />

> μμ μ½λ

```js
// μκ³ λ§λ€κΈ°
(function printNow() {
  // μκ³ μΈμ€ν΄μ€ μμ±
  const today = new Date();

  const dayNames = [
    "(μΌμμΌ)",
    "(μμμΌ)",
    "(νμμΌ)",
    "(μμμΌ)",
    "(λͺ©μμΌ)",
    "(κΈμμΌ)",
    "(ν μμΌ)",
  ];

  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  const ampm = hour >= 12 ? "PM" : "AM";

  // 12μκ°μ λ‘ λ³κ²½
  hour %= 12;
  hour = hour || 12; // hour 0μΈ κ²½μ° 12λ₯Ό μ¬ν λΉ

  // 10 λ―Έλ§μΈ λΆ,μ΄ 2μλ¦¬λ‘ λ³κ²½
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const now = `${year}λ ${month}μ ${date}μΌ ${day} ${hour}:${minute}:${second} ${ampm}`;

  console.log(now);

  setTimeout(printNow, 1000); // 1μ΄λ§λ€ νμ΄λ¨Έ ν¨μ μ¬κ·νΈμΆ
})();
```
