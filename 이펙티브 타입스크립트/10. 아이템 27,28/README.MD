🎯💡🔥📌✅✔

# 아이템 27 `함수형 기법과 라이브러리로 타입 흐름 유지하기`

<br />

```
✅ 아이템 27 요약

✅ 타입 흐름을 개선하고, 가독성을 높이고, 명시적인 타입 구문의 필요성을 줄이기 위해 직접 구현하기보다는 내장된 함수형 기법과 로대시 같은 유틸리티 라이브러리르 사용하는 편이 좋다.

```

<br />
<br />

> `타입 흐름을 개선`하고, 가독성을 높이고, 명시적인 타입 구문의 필요성을 줄이기 위해 직접 구현하기보다는 내장된 `함수형 기법과 lodash 같은 유틸리티 라이브러리를 사용하는 것이 좋다.` <br />

> 타입스크립트에서는 절차형 프로그래밍 보단 함수형 프로그래밍으로 구현하는 편이 좋다.

<br />
<br />
<br />

> 절차형으로 구현했을 때 예시

```ts
//팀별로 분류
const teamToplayers: { [team: string]: BasketballPlayer[] } = {};

for (const player of allPlayers) {
  const { team } = player;
  teamToPlayers[team] = teamToPlayers[team] || [];
  teamToPlayers[team].push(player);
}

//연봉 기준으로 선수 정렬
for (const players of Object.values(teamToPlayers)) {
  players.sort((a, b) => b.salary - a.salary);
}

//팀별로 가장 높은 연봉 받는 선수 뽑기
const bestPaid = Object.values(teamToPlayers).map((players) => players[0]);

//팀별로 가장 높은 연봉의 선수들을 연봉 기준으로 정렬
bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);

// 절차형 프로그래미은 코드의 양도 많고 가독성이 좋지 않다.
```

<br />
<br />

> Lodash 라이브러리를 활용한 함수형 예시

- 함수형 프로그래밍으로 구현 시 `가독성이 좋아지고` `매개변수값을 건드리지 않고` 매번 새로운 값을 반환 함으로써, 새로운 타입으로 안전하게 반환할 수 있다.

```ts
const bestPaid = _(allPlayers)
  .groupBy((player) => player.team)
  .mapValues((players) => _.maxBy(players, (p) => p.salary))
  .value()
  .sortBy((p) => -p!.salary)
  .value();
```

<br />
<br />
<br />

# 아이템 28 `유효한 상태만 표현하는 타입을 지향하기`

- 효과적으로 타입을 설계하기 위해선, `유효한 상태만 표현할 수 있는 타입을 만들어 내는 것이 가장 중요하다.`
  - 타입 설계를 명확하게함으로써 예상치 못한 버그가 숨어들 여지를 줄일 수 있다.

<br />
<br />

> 타입 설계의 잘못된 예시

```ts
interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}

// 페이지를 그리는 renderpage 함수를 작성할 때는 상태 객체의 필드를 전부 고려해서 상태 표시를 해야한다.
//isLoading이  true이고 error true이면, 로딩 중인지, 에러인지 명확하게 구분할 수 없다.
//필요한 정보가 부족하기 때문이다.
function renderPage(state: State) {
  if (state.error) return `error`;
  else if (state.isLoading) return `Loading`;

  return `currentPage`;
}
```

<br />
<br />

> 옳바른 타입 설계

```ts
// 코드의 길이는 많이 길어졌지만, 무효한 상태를 허용하지 않도록 모델링 되었다.
interface RequestPending {
  state: "pending";
}
interface RequestError {
  state: "error";
  error: "string";
}
interface RequestSuccess {
  state: "ok";
  pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

//랜딩 페이지 구현
function renderPage(state: State) {
  const { currentPage } = state;
  const requestState = state.requests[currentPage];
  switch (requestState.state) {
    case "pending":
      return `Loding ${currentPage}...`;
    case "error":
      return `Error!`;
    case "ok":
      return `ok`;
  }
}
//changePage
async function changePage(state: State, newPage: string) {
  state.requests[newPage] = { state: "pending" };
  state.currentPage = newPage;
}
```

<br />
<br />

## 상태를 표현하는 타입을 만들때는 유효한 타입만을 가지고 있어야 한다

> 위 예시

```ts
// 지향 해야 하는 방식 Bad!!
//
interface State {
  one: number;
  two: number;
  three?: number;
  four?: number;
}

// 옳바른 방식 Good!!
//
interface State1 {
  one: number;
  two: number;
}

interface State2 {
  one: number;
  two: number;
  three: number;
}

interface State3 {
  one: number;
  two: number;
  four: number;
}

type State = State1 | State2 | State3;
```
