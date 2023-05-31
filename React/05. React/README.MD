# 리액트쿼리 정리 (2)

- 커스텀훅을 사용하여 매번 호출한다면 키를 헷갈릴 위험이 없다.
  - 사용하길 원하는 쿼리함수를 혼동하는 위험도 없다.

<br />
<br />

> src/axiosinstance (baseURL 설정) (1)

```js
import axios, { AxiosRequestConfig } from "axios";
// base URL 설정
// src/axiosinstance
const baseUrl = "http://localhost:3030";

//토큰
export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

//baseURL
const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
```

<br />

> Custom Hooks (2)

```js
//쿼리 키 (모든 호출에서 쿼리키가 일관적이도록 처리)
const queryKey = {
  treatment: "treatments",
  appointments: "apoointments",
  user: "user",
  staff: "staff",
};

//axios통신
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  return data;
}

//useQuery
export function useTreatments(): Treatment[] {
  //데이터에 대한 폴백값을 생성하여 확보 (서버에서 데이터를 받지않고 캐시가 비어 있는 경우)
  const fallback = [];
  //초기값을 []로 주어 map함수 초기에 에러가 나지 않도록 처리
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments);
  return data;
}
```

---

---

<br />
<br />
<br />

# useIsFetching

- 각 컴포넌트 마다 개별 로딩 인디케이터를 사용하는 대신 `중앙화된 로딩 인디케이터를 사용하기`

<br />
<br />

> App.ts (1)

```tsx
export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Loading />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
```

<br />

> Loading.tsx 로딩 스페너 구현 (2)

```tsx
import { useIsFetching } from "react-query";
export function Loading(): ReactElement {
  //useIsFetching은 현재 가져오기 상태인 쿼리 호출의 수를 나타내는 정수값을 반환한다.
  const isFetching = useIsFetching();

  const display = isFetching ? "inherit" : "none";

  return (
    <Spinner thickness="4px" display={display}>
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
```

---

---

<br />
<br />
<br />

# 집중식 오류 핸들링 (queryClient 추가)

<br />

> App.tsx (1) `QueryClientProvider 추기`

```tsx
export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Loading />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
```

<br />

> 집중식 오류 핸들링 (2)

```tsx
import { createStandaloneToast } from "@chakra-ui/react";
import { QueryClient } from "react-query";
const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  toast.closeAll();
  toast({ title, status: "error", variant: "subtle", isClosable: true });
}

// 집중식 오류 핸들링
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
```

# 캐시에 미리 데이터 채우기

- prefetchQuery : `queryclient의 메서드` , `서버에서 데이터 fetching`
- setQueryData : `queryclient의 메서드` , `클라이언트에서 캐시에 데이터 추가`
- placeholderData : `useQuery의 옵션` , `클라이언트에서 데이터 가져오고, 캐시에 추가X`
- initialData : `useQuery의 옵션` , `클라이언트에서 데이터 가져오고 캐시에 추가 X`

<br />
<br />

> 프리페칭 예시 (1)

```js
const queryKey = {
  treatment: "treatments",
  appointments: "apoointments",
  user: "user",
  staff: "staff",
};

//axios통신
import { useQuery, useQueryClient } from "react-query";
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  return data;
}
// 프리 패칭
export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchingQuery(queryKeys.treatments, getTreatments);
}
//usePrefetchTreatments() 훅 사용 시 프리패칭
```

---

---

<br />
<br />
<br />

# 의존성 배열로서의 쿼리 키

- `keepPreviousData` : 쿼리 키가 변경될 때까지 이전의 모든 데이터가 그대로 유지된다.
  - `다음 쿼리 키에 대한 데이터를 로드하는 동안 자리 표시자로 사용하는 것`
  - useQuery에서 fetching를 진행하는 동안 잠시 보여줌

<br />

> 예시

```js
const fallback = {};
const { data: appointments = fallback } = useQuery(
  //모근 쿼리는 이 지정된 쿼리 키를 사용한다.
  //쿼리 데이터는 만료 상태이지만, 리페치를 트리거할 대상이 없다.
  //항상 키를 의존성 배열로 취급해야한다.
  queryKeys.appointments,
  //[queryKeys.appointments, monthYear.year, monthYear.month] 옳바른 의존성 배열
  () => getAppointments(monthYear.year, monthYear.month)
);
return { appointments, monthYear, updateMonthYear };
```

<br />
<br />

> 예시 (프리패칭)

```js
//커스텀 훅
export function useAppointments(): UseAppointments {
  //프리패칭
  const queryClient = useQueryClient();
  useEffect(() => {
    const nextMonthYear = getNewMonthYear(monthYear, 1);
    [queryKeys.appointments, monthYear.year, monthYear.month],
      () => getAppointments(monthYear.year, monthYear.month);
  }, [queryClient, monthYear]);

  //useQuery
  const fallback = {};
  const { data: appointments = fallback } = useQuery([
    queryKeys.appointments,
    monthYear.year,
    monthYear.month,
  ],
  () => getAppointments(monthYear.year, monthYear.month);
);

//리턴
return {appointments,monthYear,...}
}
```

```
- 의존성 배열에 공통 접두사가 있으면 한 번애 모두 무효화 할 수 있다.
```

---

---

<br />
<br />
<br />
<br />
<br />
<br />

# Select (데이터 변환) , preFetching 옵션은 아님

- `Select`를 사용하면 쿼리 함수가 반환하는 데이터를 변환 할 수 있다.
- React-Query는 Select 함수를 `삼중 등호`로 비교하며, `Select함수`는 `데이터`와 `함수`가 모두 변경되었을 경우에만 실행된다.
- `마지막으로 검색한 데이터와 동일한 데이터`이고, Select 함수에도 변동이 없으면 Select함수를 재실행하지 않는 것이 `React Query최적화` 이다.

<br />
<br />

> Select 예시 11

```jsx
//셀렉트 함수 (익명함수라서 변경됨, 최적화를 위해 useCallback)
const selectFn = useCallback(
  //넘길 데이터 data, user
  (data) => Fn(data, user);
  ,
  [user]
);

const showAll = false;

const { data: appointments = fallback } = useQuery(
  //쿼리 키
  [queryKeys.appointments, monthYear.year, monthYear.month],
  //호출 api
  () => getApponitments(monthYear.year, monthYear.month),
  {
    //showAll이 false일때 selectFn 함수 실행
    //selectFn은 데이터를 변환한 다음 반환한다.
    select: showAll ? undefined : selectFn,
  }
);
```

<br />
<br />
<br />

> Select 예시 22

```js
// Select함수의 필터 함수
export function filterByTreatment(staff,filter){
    return staff.filter((person) => person.filter.map((t) => t.toLowerCase()).includes(filter.toLowerCase()))
}


export function useStaff(): UseStaff {
  const [filter, setFilter] = useState("all");
  // Select함수 useCallback 덕분에 안전
  // 위에 있는 filter변수의 값 사용
  const selectFn = useCallback(
    (data) => filterByTreatment(data, filter),
    [filter]
  );

  // useQuery
  const fallback = [];
  const { data: staff = fallback } = useQuery(
    queryKeys.staff
    ,
  (data) => await axiosInstance.get('/staff');
  ,
   {
    select: filter !== "all" ? selectFn : undefined,
  });

  return { staff, filter, setFilter };
}
```
