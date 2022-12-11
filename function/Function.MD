# 함수 관련

```js
const x = "x";
function c() {
  const y = "y";
  console.log("c");
}

function a() {
  const x = "x";
  console.log("a");
  function b() {
    console.log("b");
    c();
  }
  b();
}

a();
c();
```
