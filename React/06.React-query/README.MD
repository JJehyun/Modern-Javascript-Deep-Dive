# 리액트쿼리 정리 (3)🎯💡🔥📌✅

- `queryClient.setQueryData`
  - 쿼리 키와 값을 가져와 쿼리 캐시에 해당 키에 대한 값을 설정 할 수 있다.
  - `쿼리 함수 없이 직접 설정`

<br />

- `onSucess` : `setQueryData` or `useQuery` 다음에 호출된다.

<br />

```
서버에서 데이터를 다시 가져올 필요없이 워키 데이터 내부 로직 자체에서 업데이트 한다.
  - 다음 네트워크 요청을 기다릴 필요가 없으므로 사용자 입장에서는 즉각적인 피드백을 받을 수 있다.

쿼리 키와 값을 인수로 받아 존재하는 cached data에 해당 키에 대한 값을 updating 할 수 있게 한다.

setQueryData와 fetchQuery의 차이점은, setQueryData는 동기화이며 이미 동기식으로 데이터를 사용할 수 있다고 가정한다.

데이터를 비동기적으로 가져와야 하는 경우 쿼리 키를 다시 가져오거나 fetchQuery를 사용하여 비동기로 처리하는 것이 좋다.
```

<br />

> auth query

```ts
export function useUser(): UseUser {
  const queryClient = useQueryClient();
  //useQuery
  const { data: user } = useQuery(queryKeys.user, () => getUser(user));

  //update
  function updateUser(newUser: User): void {
    //해당하는 쿼리 키에 대한 값의 캐시를 수정 queryKeys.user --> newUser
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  //clear
  function clearUser() {
    //해당하는 쿼리 키에 대한 값의 캐시를 수정 queryKeys.user --> null
    queryClient.setQueryDate(querykeys.user, null);
  }

  return { user, updateUser, clearUser };
}
```

<br />
<br />

## (Opt) onSuccess

> `쿼리함수` or `setQueryData` 에서 데이터를 가져오는 함수

<br />

> onSuccess 예시

```ts
export function useUser(): UseUser {
  const { data: user } = useQuery(queryKeys.user, () => getUser(user), {
    //recieved :: 쿼리함수 반환값을 받은 값
    onsuccess: (recieved: User | null) => {
      if (!recieved) localStorage.removeItem("lazyday_user");
      else localStorage.setItem("lazyday_user", recieved);
    },
  });
}
```

<br />
<br />
<br />
<br />
<br />

## localStorage initalData 초기 데이터

```
📌 useQuery
  - initialData : 초기 데이터를 캐시에 추가하고 싶을 때 사용
```

> 구현 예시

```ts
function getStoredUser(): User | null {
  const storeUser = localStorage.getItem("KeyValue");
  return storeUser ? JSON.parse(storeUser) : null;
}

function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(["user"], () => getUser(user), {
    //초기 데이터가 필요할 때마다 getStoredUser함수의 리턴값을 사용
    //로컬 스토리지값을 초기값으로 설정
    inittailData: getStoredUser,
  });
}
```

<br />
<br />

# 의존성 쿼리

- `enabled` : 조건에 따라 쿼리 무효화
- `데이터 만료 상황`
  - RQ는 서버에 새로 연결하지 않는다. (기존에 이미 실행되고 있다면 ReactQuery가 서버로 중복되는 요청을 제거 함)
  - `여러 요청이 있어도 동시에 실행되지 않는다`.

<br />

> 예시

```ts
// 만료 했을때 새 데이터를 위해 서버에 핑을 실행하기 보다 캐시의 데이터를 가져온다.
function useUserAppointments(): Appointment[] {
  const { user } = useUser();
  const fallback: Appointment[] = [];
  const { data: userAppointments = fallback } = useQuery(
    "user-appointments",
    // axios함수
    () => getUserAppointments(user),
    {
      //!user 불리언 타입이 되고
      //!user의 반대를 원하니까 !!user  || user 참 -> 참  , user 거짓 -> 거짓
      enabled: !!user,
    }
  );
}
```

<br />
<br />

# queryClient.removeQuery

- 특정 쿼리에 대한 데이터를 제거

<br />

> 로그아웃 예시

```ts
function clearUser() {
  //onSucess는 setQueryData 다음에 실행되고 removeQueries 다음에는 실행되지 않는다.
  queryClient.setQueryData("queryKey", null);
  // 쿼리 키는 하나만 추가할 수 있다.
  queryClient.removeQueries("user-appointment");
  // 하나 이상의 쿼리 키에 removeQueries를 실행하려면 removeQueries를 여러번 동일하게 실행 해야 한다.
}
```

<br />
<br />
<br />
<br />
<br />
<br />

# Mutate

- 낙관적 업데이트 (Optimistic Update)
  - `변이가 성공하기 희망하지만 실패하더라도 롤백할 수 있다는 의미`

## useMutation

- `쿼리 키가 필요하지 않다.`
- 일회성이기 때문에 캐시 데이터가 없다.
- 기본적으로 재시도가 없다.
- `관련된 데이터가 없으므로 리페치도 없다.`
- 캐시 데이터가 없으므로 `isLoading, isFetching이 구분되지 않는다.`
  - 오직 `isFetching`만 존재한다.
- 반환값으로 `mutate` `함수`를 `반환`한다.
  - 변이를 실행하는데 사용된다.

<br />
<br />

> useMutation 사용 예시

```js
//type관련
import { UseMutateFunction } from "@tanstack/react-query";

//변이 함수()
async function setAppointmentUser(): Promise<void> {
  if (!userId) return;
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

//useMutation()
function useReserveAppoint(): UseMutateFunction<
  //첫번째 인수 - 변이 함수 자체에서 반환된 데이터 유형
  void,
  //두번째 인수 - 변이 함수에서 발생 할 것으로 예상되는 오류 유형
  unknown,
  //세번째 인수 - mutate함수가 예상하는 변수 유형
  unknown,
  //네번째 인수 - 낙관적 업데이트 롤백을 위해 onMuate에 설정하는 유형
  unknown
> {
  //useMutation에는 쿼리키가 필요하지 않다.
  //오직 변이 함수만 있으면 됨
  //mutate 함수에 인수를 전달함으로써 useMutation에 인수를 전달 할 수 있다.
  const { mutate } = useMutation(
    //변이 함수
    (params) => Fn(params)
  );
}

//변이 함수
//useMutation 변이함수에 인수 전달
mutate(mutate);
```

<br />
<br />
<br />

# 변이 후 쿼리 무효화 하기 (invalidateQueries)

- 사용자가 페이지를 새로고침 할 필요가 없도록 하기 위함
- 효과
  - 쿼리를 강제 만료
  - 쿼리가 현재 랜더링 중이면 리페치를 트리거한다.
  - 사용자가 페이지를 새로고침 할 필요 없도록 데이터를 업데이트 하는 것
- `invalidateQueries`
  - 정확한 키가 아닌 접두사를 사용한다.
  - `동일한 쿼리 키 접두사로 서로 관련된 쿼리를 설정하면 모든 쿼리를 한번에 무효화 할 수 있다.`
    - 정확한 키로 설정을 원한다면
    - `{exact : true}`로 설정하면 된다.

<br />

```
✅ mutate --[onSuccess]--> invalidateQueries (관련 쿼리 무효화) --> 이에 따라 데이터 리페치가 트리거 된다.
```

<br />
<br />

> 예시 코드

```js
const queryClient = useQueryClient();

//useMutation()
function useReserveAppoint(): UseMutateFunction<
  void,
  unknown,
  unknown,
  unknown
> {
  const { mutate } = useMutation(
    //변이 함수
    (appointment: Appointment) => setAppointmentUser(appointment, user?.id),
    {
      onSuccess: () => {
        //지정 쿼리키 무효화
        queryClient.invalidateQueries([queryKeys.appointments]);
        //피트백
        toast({"데이터가 업데이트 되었습니다."})
      },
    }
  );
  return mutate;
}
```

<br />
<br />
<br />
<br />
<br />
<br />

# 변이(Mutation) 서버 응답으로 사용자와 쿼리 캐시 업데이트 하기

- `변이를 보낼 때 서버가 보낸 응답에서 캐시를 업데이트 하는 방법`
- `onSuccess`으로 서버 응답을 받아 해당 데이터를 사용해서 쿼리 캐시 업데이트

<br />
<br />

> 예시 코드

```js
//변이 함수
async function patchUserOnServer(): Promise<User | null> {
  if (!newData || !originalData) return null;
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    }
  );
  return data.user;
}

//useMutate 함수
export function usePatchUser(): (newData: User | null) => void {
  const { user, updateUser } = useUser();
  const { mutate: patchUser } = useMutateion(
    //변이 함수 부분
    (newUserData: User) => {
      patchUserOnServer(newUserData, user),
        // 서버에서 받은 응답으로 사용자를 업데이트
        // onSuccess는 변이 함수 부분에서 반환된 return을 인자로 받는다.
        // returnData : 변이 함수 실행 결과의 return 응답 데이터
        {
          onSuccess: (returnData) => updateUser(returnData),
        };
    }
  );

  return patchUser;
}
```
