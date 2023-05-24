# Zustand

> 상태 관리 라이브러리


<br />
<br />

- `설치`
> $ npm installZustand

<br />
<br />

> 1. store 생성 (예시)
```ts
import create, { SetState } from 'zustand';

type Tab = 'home' | 'video' | 'search' | 'profile' | 'setting';

type State = {
  tab: Tab;
  setTab: (value: Tab) => void;
  getTab: () => Tab;
  fetchTab: () => Promise<void>;

};

const useTabStore = create<State>((set: SetState<State>) => ({
  tab: 'home',
  setTab: (value: Tab) => set((state) => ({ tab: value })), 
  getTab: () => { const { tab } = set.getState(); return tab;}, 
  fetchTab: async () => {
      const response = await fetch('/api/tab');
      const data = await response.json();
      set((state) => ({ tab: data.tab }));
    },
}));

export default useTabStore;
```

<br />

> 1-1. store 생성 (예시)

```js
import create from 'zustand' // create로 zustand를 불러옵니다.

const useStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

export default useStore
```

- `create`함수를 이용해서 store 전역 변수 생성
- 각 `get`/`set`/`전역 변수 초기값 설정`

<br />
<br />

> 2. 전역 변수 사용 (예시)

```ts
import useStore from '../../../Store';

//커스텀 훅으로 사용
const { tab, setTab, getTab, fetchTab } = useStore();
```

<br />

> 2-1. 전역 변수 사용 (예시)

```jsx
import useStore from '../store.js'

const App = () => {
    const { bears, increasePopulation, removeAllBears } = useStore(state => state)

    return (
        <>
            <h1>{bears} around here ...</h1>
            <button onClick={increasePopulation}>one up</button>
            <button onClick={removeAllBears}>remove all</button>
        </>
    )
}
```

<br />

---
