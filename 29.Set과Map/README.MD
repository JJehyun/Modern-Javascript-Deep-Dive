# Set π―π‘π₯πβ

- `Set` : Set κ°μ²΄λ μ€λ³΅λμ§ μλ μ μΌν κ°λ€μ μ§ν©μ΄λ€.
  - `Set`μ `μνμ  μ§ν©`μ κ΅¬ννκΈ° μν μλ£κ΅¬μ‘°
    - `κ΅μ§ν©`,`ν©μ§ν©`,`μ°¨μ§ν©`,`μ¬μ§ν©` κ΅¬νκ°λ₯
  - λ°°μ΄κ³Ό μ μ¬νμ§λ§, 3κ°μ§μ μ°¨μ΄κ° μλ€.
  - `μλ ν` μ°Έκ³ 
    |κ΅¬λΆ|λ°°μ΄|Set κ°μ²΄|
    |---|---|---|
    |λμΌν κ°μ μ€λ³΅ν΄μ ν¬ν¨ν  μ μλ€.|O|X|
    |μμ μμμ μλ―Έκ° μλ€.|O|X|
    |μΈλ±μ€λ‘ μμμ μ κ·Όν  μ μλ€|O|X|

<br />
<br />

---

## Set κ°μ²΄μ μμ±

- Set κ°μ²΄λ Set μμ±μ ν¨μλ‘ μμ±νλ€.
  - Set μμ±μ ν¨μλ μ΄ν°λ¬λΈμ μ λ¬ λ°μ `Set κ°μ²΄`λ₯Ό `μμ±`ν¨
  - μ΄ν°λ¬λΈμ μ€λ³΅λ κ°μ Set κ°μ²΄μ μ μ₯λμ§ μλλ€.
    - μ΄λ₯Ό μ΄μ©ν΄ λ°°`μ΄μ μ€λ³΅λ κ°`μ `μ κ±°`ν  μ μλ€.

> μμ μ½λ

```js
const set = new Set();
console.log(set); // Set(0){}

//ν°λ¬λΈμ μ€λ³΅λ κ°μ Set κ°μ²΄μ μ μ₯λμ§ μλλ€.
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); //Set(3){1,2,3}
const set2 = new Set("Javascript");
console.log(set2); // Set(9) { 'J', 'a', 'v', 's', 'c', 'r', 'i', 'p', 't' }

// μ€λ³΅λ μμ μ κ±° -> Set κ°μ²΄
const uniq = (arr) => [...new Set(arr)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
```

<br />
<br />
<br />

---

## Set κ°μ²΄μ μμ κ°μ νμΈ size

- Set κ°μ²΄μ μμ κ°μ νμΈ : `Set.prototype.size` νλ‘νΌν°λ₯Ό μ¬μ©νλ€.
  - setter ν¨μμμ΄ `getter ν¨μ`λ§ μ‘΄μ¬νλ `μ κ·Όμ νλ‘νΌν°`μ΄λ€.
- λμ€νΈλ­μ²λ§ λ°©μ μ¬μ©

<br />

> μ¬μ© μμ 

```js
const set1 = new Set([1, 2, 2, 3]);
console.log(set1.size); // 3

// size μ κ·Όμ νλ‘νΌν°λ setter ν¨μκ° μμ΄μ λ¬΄μ
set1.size = 10;
console.log(set1.size); // 3
```

<br />
<br />
<br />

---

## Set κ°μ²΄μ μμ κ°μ νμΈ add

- `Set κ°μ²΄`μ μμλ₯Ό μΆκ°ν  λ `Set.prototype.add` λ©μλλ₯Ό μ¬μ©νλ€.
  - `add λ©μλ` : μλ‘μ΄ μμκ° μΆκ°λ `Set κ°μ²΄`λ₯Ό `λ°ν`νλ€.
  - `add λ©μλ` : `μ°μμ ` νΈμΆ κ°λ₯
    - μ€λ³΅λ μμμ μΆκ°λ νμ© X
- `Set κ°μ²΄`λ λ°°μ΄κ³Ό κ°μ΄ μλ°μ€ν¬λ¦½νΈμ `λͺ¨λ  κ°`μ μμλ‘ `μ μ₯ κ°λ₯`

<br />

> μ¬μ© μμ

```js
const set1 = new Set([1, 2, 2, 3]);
console.log(set1); // Set(3) { 1, 2, 3 }

set1.add(4).add(5);
console.log(set1); // Set(4) { 1, 2, 3, 4, 5 }
```

<br />

> μ¬μ© μμ

```js
const set = new Set();

// add λ©μλ μ²΄μ΄λ
set
  .add(1)
  .add("a")
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(() => {});

console.log(set);
// Set(8) {
//   1,
//   'a',
//   true,
//   undefined,
//   null,
//   {},
//   [],
//   [Function (anonymous)]
// }
```

<br />
<br />
<br />

---

## Set κ°μ²΄μ μμ μ‘΄μ¬ μ¬λΆ νμΈ has

- `Set κ°μ²΄μ` νΉμ  μμκ° μ‘΄μ¬νλμ§ νμΈ νλ €λ©΄ `Set.prototype.has` λ©μλλ₯Ό μ¬μ©νλ€.
  - νΉμ  μμ μ‘΄μ¬ μ¬λΆλ₯Ό `booleanμΌλ‘` λ°ν

<br />

> μ¬μ© μμ

```js
const set = new Set([1, 2, 3]);

console.log(set.has(3)); // true
console.log(set.has(4)); // false
```

<br />
<br />
<br />

---

## Set κ°μ²΄μ μμ μ­μ  delete

- Set κ°μ²΄μ νΉμ  μμλ₯Ό μ­μ νλ €λ©΄, `Set.prototype.delete` `λ©μλλ₯Ό μ¬μ©`νλ€.
  - μ­μ  μ±κ³΅ μ¬λΆλ₯Ό `booleanμΌλ‘ λ°ν`
- μ­μ  μ μΈλ±μ€X , `μμκ°`μ `μ λ¬`ν΄μΌ ν¨
- `μ°μμ  νΈμΆ` λΆκ°λ₯

<br />

> μ¬μ© μμ

```js
const set = new Set([1, 2, 3]);

let result = set.delete(3);
console.log(set, result); // Set(2) { 1, 2 } true

result = set.delete(4);
console.log(set, result); // Set(2) { 1, 2 } false
```

<br />
<br />
<br />

---

## Set κ°μ²΄μ λͺ¨λ  μμ μ­μ  clear

- Set κ°μ²΄μ λͺ¨λ  μμλ₯Ό `μΌκ΄ μ­μ ν  λ μ¬μ©`
  - λ°νκ° : μΈμ λ `undefined`

<br />

> μ¬μ© μμ

```js
const set = new Set([1, 2, 3]);

let result = set.clear();
console.log(set, result); // Set(0) {} undefined
```

<br />
<br />
<br />

---

## Set κ°μ²΄μ μμ μν forEach

`Set.prototype.forEach` λ `Array.prototype.forEach` λ©μλμ μ μ¬ν¨

- `Setκ°μ²΄`λ μμμ μλ―Έκ° μμ΄ λ°°μ΄κ³Ό κ°μ΄ `μΈλ±μ€λ₯Ό κ°μ§μ§ μλλ€.`

- `Set.prototype.forEach` : `μ²«λ²μ§Έ,λλ²μ§Έ μΈμλ κ°λ€`
  - `μ²«λ²μ§Έ μΈμ` : νμ¬ μνμ€μΈ κ°
  - `λλ²μ§Έ μΈμ` : νμ¬ μνμ€μΈ κ°
  - `μΈλ²μ§Έ μΈμ` : νμ¬ μνμ€μΈ Set κ°μ²΄ μμ²΄

<br />

> μ¬μ© μμ

```js
const set = new Set([1, 2, 3]);

set.forEach((v1, v2, self) => console.log(v1, v2, self));
// 1 1 Set(3) { 1, 2, 3 }
// 2 2 Set(3) { 1, 2, 3 }
// 3 3 Set(3) { 1, 2, 3 }
```

- Set κ°μ²΄λ `μ΄ν°λ¬λΈ`μ΄λ€.
  - μ΄ν°λ¬λΈ μ΄κΈ° λλ¬Έμ `for ...of`, `μ€νλ λ λ¬Έλ²`, `λμ€νΈλ­μ²λ§ μ¬μ©` κ°λ₯
  - `for ...of` : μννλ μμλ μμκ° `μΆκ°λ μμ`λ₯Ό λ°λ₯Έλ€.

<br />

> μ¬μ© μμ

```js
const set = new Set([1, 2, 3]);

// Set κ°μ²΄κ° μ΄ν°λ¬λΈ -> Symbol.iterator νλ‘νΌν°κ° μ‘΄μ¬νλμ§ νμΈ
console.log(Symbol.iterator in set); // true

// Set κ°μ²΄κ° μ΄ν°λ¬λΈ -> for - ofλ¬Έ κ°λ₯
for (const value of set) {
  console.log(value); // 1 2 3
}

// Set κ°μ²΄κ° μ΄ν°λ¬λΈ -> μ€νλ λ λ¬Έλ² κ°λ₯
console.log([...set]); // [ 1, 2, 3 ]

// Set κ°μ²΄κ° μ΄ν°λ¬λΈ -> λ°°μ΄ λμ€νΈλ­μ²λ§ κ°λ₯
const [a, ...rest] = set;
console.log(a, rest); // 1 [ 2, 3 ]
```

<br />
<br />
<br />

---

## Set μ§ν© κ΅¬ν (κ΅μ§ν©,ν©μ§ν©,μ°¨μ§ν©,λΆλΆμ§ν© & μμμ§ν©)

- κ΅μ§ν© κ΅¬ν

```js
// Set κ°μ²΄ νλ‘ν νμμ "κ΅μ§ν©" μ μ
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const val of set) {
    if (this.has(val)) result.add(val);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA μ setBμ κ΅μ§ν©
console.log(setA.intersection(setB)); // Set(2) { 2, 4 }
// setB μ setAμ κ΅μ§ν©
console.log(setB.intersection(setA)); // Set(2) { 2, 4 }
```

- (κ³ μ°¨ν¨μ + Set)κ΅μ§ν©

```js
Set.prototype.intersection = function (set) {
  return new Set([...this].filter((v) => set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); // Set(2) { 2, 4 }
console.log(setB.intersection(setA)); // Set(2) { 2, 4 }
```

<br />
<br />

---

<br />

- ν©μ§ν© κ΅¬ν

```js
// Set κ°μ²΄ νλ‘ν νμμ "ν©μ§ν©" μ μ
Set.prototype.union = function (set) {
  const result = new Set(this);

  for (const val of set) {
    result.add(val);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA μ setBμ ν©μ§ν©
console.log(setA.union(setB)); // Set(4) { 1, 2, 3, 4 }
// setB μ setAμ ν©μ§ν©
console.log(setB.union(setA)); // Set(4) { 2, 4, 1, 3 }

/**
 * π‘ ν©μ§ν©μ μμ κ΅¬μ±μ κ°μΌλ, μμ κ΅¬μ± μμλ λ³΄μ₯νμ§ X
 */
```

- (κ³ μ°¨ν¨μ + Set)ν©μ§ν©

```js
Set.prototype.union = function (set) {
  return new Set([...this, ...set]);
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.union(setB)); // Set(4) { 1, 2, 3, 4 }
console.log(setB.union(setA)); // Set(4) { 2, 4, 1, 3 }
```

<br />
<br />

---

<br />

- μ°¨μ§ν©

```js
// Set κ°μ²΄ νλ‘ν νμμ "μ°¨μ§ν©" μ μ
Set.prototype.difference = function (set) {
  const result = new Set(this);

  for (const val of set) {
    result.delete(val);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA - setB
console.log(setA.difference(setB)); // Set(2) { 1, 3 }
// setB - setA
console.log(setB.difference(setA)); // Set(0) {}
```

<br />

- (κ³ μ°¨ν¨μ + Set)μ°¨μ§ν©

```js
Set.prototype.difference = function (set) {
  return new Set([...this].filter((v) => !set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.difference(setB)); // Set(2) { 1, 3 }
console.log(setB.difference(setA)); // Set(0) {}
```

<br />
<br />

---

<br />

- λΆλΆμ§ν© & μμμ§ν©

```js
// Set κ°μ²΄ νλ‘ν νμμ "μλΈμμ λν μμ μ§ν©" μ μ
Set.prototype.isSuperset = function (subset) {
  for (const val of subset) {
    if (!this.has(val)) return false;
  }

  return true;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setBκ° setAμ λΆλΆμ§ν©μΈμ§ νλ³ (= setAκ° setBμ μμ μ§ν©μΈμ§ νλ³)
console.log(setA.isSuperset(setB)); // true
// setAκ° setBμ λΆλΆμ§ν©μΈμ§ νλ³ (= setBκ° setAμ μμ μ§ν©μΈμ§ νλ³)
console.log(setB.isSuperset(setA)); // false
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />

---

# Map κ°μ²΄

- Map κ°μ²΄λ `ν€μ κ°`μ μμΌλ‘ μ΄λ£¨μ΄μ§ `μ»¬λ μ`
- Map κ°μ²΄λ μΌλ° κ°μ²΄μ μ μ¬ νμ§λ§ `3κ°μ§μ μ°¨μ΄μ `μ΄ μλ€.
  |κ΅¬λΆ|κ°μ²΄|Map κ°μ²΄|
  |---|---|---|
  |ν€λ‘ μ¬μ©ν  μ μλ κ° |λ¬Έμμ΄ or μ¬λ² κ° |κ°μ²΄λ₯Ό ν¬ν¨ν λͺ¨λ  κ°|
  |μ΄ν°λ¬λΈ|X|O|
  |μμ κ°μ νμΈ |Object.keys(obj).length |Map.prototype.size|

<br />

```
β μΌλ° κ°μ²΄λ λ¬Έμμ΄,μ¬λ²λ§ ν€λ‘ μ¬μ© κ°λ₯
β Map κ°μ²΄λ ν€ νμμ μ νμ΄ μλ€. (κ°μ²΄λ₯Ό ν¬ν¨ν λͺ¨λ  κ°μ ν€ κ°μΌλ‘ μ¬μ© κ°λ₯ νλ€)
```

<br />
<br />

---

## Map κ°μ²΄ μμ± νκΈ°

- μ΄ν°λ¬λΈμ μΈμλ‘ μ λ¬λ°μ Map κ°μ²΄λ₯Ό μμ± νλ€.
  - μ λ¬λλ `μΈμ`λ `ν€μ κ°`μΌλ‘ μ΄λ£¨μ΄μ§ μμλ‘ κ΅¬μ± λμ΄μΌ νλ€.
- μΈμλ‘ μ λ¬λ μ΄ν°λ¬λΈ μ€μ `μ€λ³΅λ ν€λ μ‘΄μ¬ν  μ μλ€`
  - `μ€λ³΅λ ν€λ₯Ό κ°μ§λ μμλ λ?μ΄μ¨μ§λ€.`

<br />

> μ¬μ© μμ 

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log(map1); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }

const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object

const map1 = new Map([
  ["key1", "κΈ°μ‘΄ κ°"],
  ["key1", "λ?μ΄μ°μΈ κ°"],
]);
console.log(map1); // Map(1) { 'key1' => 'λ?μ΄μ°μΈ κ°' }
```

<br />
<br />

---

## Map κ°μ²΄ μμ κ°μ νμΈ νκΈ° size

- `Map κ°μ²΄` μμ νμΈ μ `Map.prototype.size` νλ‘νΌν°λ₯Ό μ¬μ©νλ€.
- setter μμ΄ `getter ν¨μλ§ μ‘΄μ¬νλ μ κ·Όμ νλ‘νΌν°`
  - size νλ‘νΌν°μ μ«μλ₯Ό ν λΉν΄ `μμ κ°μ λ³κ²½ XX`

<br />

> μ¬μ© μμ  (λμ€νΈλ­μ²λ§ μ¬μ© size μ΄λ¦ κ°μ)

```js
const { size } = new Map([
  ["key1", "value1"],
  ["key1", "value2"],
]);

console.log(size); // 1
```

<br />
<br />
<br />

---

## Map κ°μ²΄ μμ μΆκ° νκΈ° set

- `Map` κ°μ²΄μ μμλ₯Ό μΆκ° ν λ `Map.prototype.set` μ¬μ©
  - setμ `μ°μμ `μΌλ‘ νΈμΆ κ°λ₯
  - μ€λ³΅λλ κ° μΆκ° μ `λ?μ΄μ¨μ§`

<br />

> μ¬μ© μμ  (λμ€νΈλ­μ²λ§ μ¬μ© size μ΄λ¦ κ°μ)

```js
//(1)μ²«λ²μ§Έ μμ 
const map = new Map();
console.log(map); // Map(0) {}

map.set("key1", "value1");
console.log(map); // Map(1) { 'key1' => 'value1' }

//(2)λλ²μ§Έ μμ   set μ°μ μ¬μ©!
const map = new Map();
console.log(map); // Map(0) {}

map.set("key1", "value1").set("key2", "value2");
console.log(map); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }

//(3)μΈλ²μ§Έ μμ   μ€λ³΅λ κ°μ΄ μλ€λ©΄ λ?μ΄ μ°μ¬μ§
const map = new Map();
console.log(map); // Map(0) {}

map.set("key1", "κΈ°μ‘΄ κ°");
map.set("key1", "λ?μ΄μ°μΈ κ°");
console.log(map); // Map(1) { 'key1' => 'λ?μ΄μ°μΈ κ°' }

//(4)λ€λ²μ§Έ μμ  ν€κ°μ μΌλ° κ°μ²΄λ‘
const map = new Map();

const objKey1 = { lastName: "W" };
const objKey2 = { firstName: "YM" };

// κ°μ²΄λ₯Ό Map κ°μ²΄μ ν€λ‘ μ¬μ© κ°λ₯
map.set(objKey1, "value 1");
map.set(objKey2, "value 2");

console.log(map);
// Map(2) {
//   { lastName: 'W' } => 'value 1',
//   { firstName: 'YM' } => 'value 2'
// }
```

<br />
<br />
<br />

---

## Map κ°μ²΄ μμ νλ get

- `Mapκ°μ²΄μμ` νΉμ  μμ μ·¨λνλ €λ©΄ `Map.prototype.get` λ©μλλ₯Ό μ¬μ©νλ€.
  - get λ©μλμ μΈμλ‘ ν€λ₯Ό μ λ¬ -> Map κ°μ²΄μμ μΈμλ‘ μ λ¬ν ν€λ₯Ό κ°λ κ°μ λ°ν
  - μ‘΄μ¬νμ§ μλλ€λ©΄ `undefined`

<br />

> μ¬μ© μμ

```js
const map = new Map();

const obj1 = { name: "W" };
const obj2 = { name: "YM" };

map.set(obj1, "developer").set(obj2, "Front Dev");

console.log(map.get(obj1)); // developer
console.log(map.get(obj2)); // Front Dev
console.log(map.get("key")); // undefined
```

<br />
<br />
<br />

---

## Map κ°μ²΄ μμ μ‘΄μ¬ μ¬λΆ νμΈ has

- `Map κ°μ²΄`μμ νΉμ  μμκ° μλμ§ νμΈ Map.prototype.has λ©μλ μ¬μ©νλ€.
  - νΉμ  μμμ μ‘΄μ¬ μ¬λΆμ λ°λΌ `boolean κ°μ λ°ν`

<br />

> μ¬μ© μμ 

```js
const obj1 = { name: "W" };
const obj2 = { name: "YM" };

const map = new Map([
  [obj1, "developer"],
  [obj2, "Front Dev"],
]);

console.log(map.has(obj1)); // true
console.log(map.has("key")); // false
```

<br />
<br />
<br />

---

## Map κ°μ²΄ μμ μ­μ  delete

- `Map κ°μ²΄` μμλ₯Ό μ­μ  νλ €λ©΄ `Map.prototype.delete` λ©μλλ₯Ό μ¬μ©νλ€.
  - `delete`λ©μλλ μ­μ  μ±κ³΅ μ¬λΆλ₯Ό λνλ΄λ boolean κ° λ°ν νλ€.
  - ν€μ ν΄λΉνλ μμκ° μλ€λ©΄ `λ¬΄μ`

<br />

> μ¬μ© μμ 

```js
const obj1 = { name: "k" };
const obj2 = { name: "im" };

const map = new Map([
  [obj1, "developer"],
  [obj2, "Front Dev"],
]);

let result = map.delete(obj1);
console.log(map, result); // Map(1) { { name: 'im' } => 'Front Dev' } true

result = map.delete("key");
console.log(map, result); // Map(1) { { name: 'im' } => 'Front Dev' } false
```

<br />
<br />
<br />

---

## Map κ°μ²΄ μμ μΌκ΄ μ­μ  clear

`Map κ°μ²΄μ μμλ₯Ό μΌκ΄ μ­μ  νλ €λ©΄` `Map.prototype.clear`λ©μλλ₯Ό μ¬μ©νλ€.

- clearμ μΈμ λ `undefined`λ₯Ό λ°ν νλ€.

<br />

> μ¬μ© μμ 

```js
const obj1 = { name: "k" };
const obj2 = { name: "im" };

const map = new Map([
  [obj1, "developer"],
  [obj2, "Front Dev"],
]);

let result = map.clear();
console.log(map, result); // Map(0) {} undefined
```

<br />
<br />
<br />

---

## Map κ°μ²΄ μμ μν

- Array.prototype.forEach λ©μλμ μ μ¬νμ§λ§, `μ λ¬λ°λ μΈμκ° λ€λ₯΄λ€.`

- `μ²« λ²μ§Έ μΈμ` : νμ¬ μν μ€μΈ μμ κ°
- `λ λ²μ§Έ μΈμ` : νμ¬ μν μ€μΈ μμ ν€
- `μΈ λ²μ¨° μΈμ` : νμ¬ μν μ€μΈ Mapκ°μ²΄ μμ 
- μ²« λ²μ§Έ, λ λ²μ§Έ μΈμκ° κ°μ κ²μ λ¨μν Array.prototoype.forEach λ©μλμ μΈν°νμ΄μ€λ₯Ό ν΅μΌνκΈ° μν¨

<br />

> μ¬μ© μμ 

```js
const obj1 = { name: "W" };
const obj2 = { name: "YM" };

const map = new Map([
  [obj1, "developer"],
  [obj2, "Front Dev"],
]);

map.forEach((v, k, self) => console.log(v, k, self));
// developer { name: 'W' } Map(2) { { name: 'W' } => 'developer', { name: 'YM' } => 'Front Dev' }
// Front Dev { name: 'YM' } Map(2) { { name: 'W' } => 'developer', { name: 'YM' } => 'Front Dev' }
```

- Map κ°μ²΄λ μ΄ν°λ¬λΈμ΄λ€.
  - for of, μ€νλ λ λ¬Έλ² , λμ€νΈλ­μ²λ§ μ¬μ© κ°λ₯

<br />

> μ¬μ© μμ

```js
const obj1 = { name: "k" };
const obj2 = { name: "im" };

const map = new Map([
  [obj1, "developer"],
  [obj2, "Front Dev"],
]);

// Map κ°μ²΄ -> μ΄ν°λ¬λΈ -> Symbol.iterator νλ‘νΌν° μ‘΄μ¬ νλ³
console.log(Symbol.iterator in map); // true

// Map κ°μ²΄ -> μ΄ν°λ¬λΈ -> for - ofλ¬Έ κ°λ₯
for (const entry of map) {
  console.log(entry);
}
// [{ name: "k" }, "developer"]
// [({ name: "im" }, "Front Dev")]

// Map κ°μ²΄ -> μ΄ν°λ¬λΈ -> μ€νλ λ λ¬Έλ² κ°λ₯
console.log([...map]); // [ [ { name: '=k' }, 'developer' ], [ { name: 'im' }, 'Front Dev' ] ]

// Map κ°μ²΄ -> μ΄ν°λ¬λΈ -> λ°°μ΄ λμ€νΈλ­μ²λ§ ν λΉ κ°λ₯
const [a, b] = map;
console.log(a, b); // [ { name: 'k' }, 'developer' ] [ { name: 'im' }, 'Front Dev' ]
```

- ![image](../image/659.png)
