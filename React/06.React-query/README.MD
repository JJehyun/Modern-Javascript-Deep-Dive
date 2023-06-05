# 리액트쿼리 정리 (3)

- `queryClient.setQueryData`
  - 쿼리 키와 값을 가져와 쿼리 캐시에 해당 키에 대한 값을 설정 할 수 있다.
  - `쿼리 함수 없이 직접 설정`

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
