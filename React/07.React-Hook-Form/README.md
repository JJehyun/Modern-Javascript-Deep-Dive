# React Hook Form

- 사용자한테 여러 이메일, 비밀번호, 닉네임을 받을때 사용하는 UseForm 라이브러리
  - `사용자한테 여러 이메일, 비밀번호, 닉네임을 받을 때 하나하나 state를 선언하고, 해당 state를 다루기 위해 핸들링 함수를 만들면 코드가 너무 복잡해진다.`
  - React 에서 컴포넌트가 리랜더링이 발생하는 조건은 state가 변경되었을 때 이다.
  - 모든 값이 `state` 로 `연결`되어 있으며 `하나의 값`이 `변할때 마다` 여러개의 `자식 컴포넌트 들에서 무수히 많은 리랜더링이 발생`한다.

<br />

- 불필요한 랜더링 방지
  - input에 변화가 있을때 form의 모든 요소가 리렌더링 되는 것이 아닌 입력받고 있는 input 요소만 리렌더링한다.

<br />
<br />

> useForm를 사용하지 않았을때의 비효율

```ts
import React, { useState } from "react";
// 하나의 폼을 다루기위해서 너무 많은 state함수가 담겨져 있다.
function NoHookForm() {
  const [occupation, setOccupation] = useState(Occupation.Professor);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return <form></form>;
}

export default NoHookForm;
```

> useForm를 사용 했을 때 효율

```js
// form에 사용되는 데이터 타입 정의
interface IAuthForm {
  nickname: string;
  email: string;
  pw: string;
  pwConfirm: string;
}

const {
  register,
  formState: { errors },
  handleSubmit,
  setError,
} = useForm < IAuthForm > { mode: "onBlur" };
```

<br />
<br />
<br />
<br />

## useForm 훅 파라미터 다루기

---

<br />

- `useForm({mode:"onChange", defaultValues:{}})`
- useForm훅에 많은 파라미터 객체를 넘걸 수 있다.
  - 기본적으로 `mode` , `defaultValues`를 많이 사용한다.
  - `mode` : `validation`전략을 설정하는데 사용된다.
    - 설정들 :
      - `onSubmit`
      - `onChange` : 다수의 리랜더링이 발생해 성능에 영행을 미칠 수 있다.
      - `onBlur`
      - `all`
  - `defaultValues` : form에 기본값을 제공하는 옵션이다.
    - 기본값을 제공하지 않았을 때 input의 초기값은 `undefined`로 관리 된다.

<br />
<br />

> 예시

```ts
// onChange 이벤트 발생 시 validation 발생시키기
const model = useForm({
  mode: "onChange",
  defaultValues: {},
});

// onBlur 이벤트 발생 시 validation 발생시키기
const model = useForm({
  mode: "onBlur",
  defaultValues: {},
});

////onBlur 이벤트가 발생할때마다 validation이 실행된다.
const { register } = useForm({ mode: "onBlur" });

//이 밖에도 아래와 같은 객체를 파라미터로 전달할 수 있다.

// mode: Mode;
// reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
// defaultValues: DefaultValues<TFieldValues>;
// resolver: Resolver<TFieldValues, TContext>;
// context: TContext;
// shouldFocusError: boolean;
// shouldUnregister: boolean;
// shouldUseNativeValidation: boolean;
// criteriaMode: CriteriaMode;
// delayError: number;
```

<br />
<br />
<br />

# `useForm 반환값 이용`

| Methods / Functions | Description                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| register            | input 요소를 React hook form과 연결시켜 검증 규칙을 적용할 수 있게 하는 메소드                                                                                  |
| formState           | form state에 관한 정보를 담고 있는 객체                                                                                                                         |
| handleSubmit        | form을 submit했을 때 실행할 함수. Validation을 통과했을때 실행할 콜백함수(SubmitHandler)가 반드시 필요하다. 실패했을때의 콜백함수(SubmitErrorHandler)는 옵셔널. |
| setError            | error 관련 설정에 사용되는 함수                                                                                                                                 |

<br />

```ts
const {
  register,
  watch,
  formState: { isValid, errors },
} = useForm<SignInInput>({ mode: "onChange" });
```

<br />
<br />
<br />

# input 요소를 React hook form에 등록하기 (`register`)

> register은 input에서 값을 불러오기 위한 함수로 다른 옵션을 이용하면 input의 유효성 검사도 쉽게 할 수 있다.

<br />

- `register` : 객체를 반환하기 때문에 스프레드 문법을 이용해서 props로 전달 해주어야 한다.
  - 인자로는 `input`요소의 `name`으로 사용될 `string값`을 넣어준다.

<br />

- `register`의 요소 옵션들
  - 첫번째 파라미터 : 사용할 이름
  - `required` : input 요소 작성 안 했을때 노출될 이름
  - `minLength` : 최소 적어야할 length
  - `pattern` : vaildation
  - `placeholder` : 플레이스홀더
- `errors?.요소이름?.message` : validation fail 시 에러 메세지 표시

<br />
<br />

> register의 예제 (1)

```ts
// name과 vaildate 사용 예시
<input
  {...register('nickname', {
    required: '닉네임을 입력해주세요.',
    // required: true,
    // boolean값도 가능하지만 문자열 값을 주면, input의 value가 없을 때 해당 문자열이 errors 객체로 반환되어 에러 메세지로 표시할 수 있다.
    minLength: { // value의 최소 길이
      value: 3,
      message: '3글자 이상 입력해주세요.', // 에러 메세지
    },
    pattern: { // input의 정규식 패턴
      value: /^[A-za-z0-9가-힣]{3,10}$/,
      message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
    },
  })}
  placeholder="닉네임을 입력해주세요"
  />
<p>{errors?.nickname?.message}</p> // validation fail 시 에러 메세지 표시
```

<br />
<br />

> register의 예제 (2)

```js
// register을 사용하기 위해서는 input에 다음과 같이 {...register("사용하고 싶은 이름")} 적는다.
// input에서 입력하는 값을 실시간으로 확인하기 위해서 watch라는 함수를 사용할 수 있다.
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div className="App">
      <form>
        <input type="text" placeholder="username" {...register("username")} />
        <input type="submit" />
      </form>
    </div>
  );
}
```

<br />
<br />

# Vaildation 옵션

> input 요소마다 간편하게 유효성 검사 하기

<br />

| Methods / Functions | Description                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| required            | 필수 입력 항목 지정할 때 사용할 수 있다. boolean값도 가능하지만 문자열 값을 주면, input의 value가 없을 때 해당 문자열이 errors 객체로 반환되어 에러 메세지로 표시할 수 있다. |
| minLength           | value의 최소 길이                                                                                                                                                            |
| pattern             | input 입력값에 적용할 정규식 패턴                                                                                                                                            |
| validate            | validate 대부분의 validation 옵션들은 string, string[], number, boolean 타입 데이터에 해당되므로, 객체나 배열 input 데이터의 경우, validate 함수를 사용하는 것이 권장된다.   |

<br />

> Vaildation 관련 예시

```js
<input
  {...register('nickname', {
    required: '닉네임을 입력해주세요.',
    // required: true,
    // boolean값도 가능하지만 문자열 값을 주면, input의 value가 없을 때 해당 문자열이 errors 객체로 반환되어 에러 메세지로 표시할 수 있다.
    minLength: { // value의 최소 길이
      value: 3,
      message: '3글자 이상 입력해주세요.', // 에러 메세지
    },
    pattern: { // input의 정규식 패턴
      value: /^[A-za-z0-9가-힣]{3,10}$/,
      message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
    },
  })}
  placeholder="닉네임을 입력해주세요"
  />
<p>{errors?.nickname?.message}</p> // validation fail 시 에러 메세지 표시


// validate 예시
<input
  {...register("test1", {
    validate: {
      checkUrl: async () => await fetch() || 'error message',
      messages: v => !v && ['test', 'test2']
    }
  })}
/>
```

<br />
<br />

# handleSubmit 함수를 onSubmit props로 넘겨주기 (`handleSubmit`)

> handleSubmit은 React Hook Form에서 Submit을 관리하기 위해 만든 함수

<br />

- handleSubmit 함수의 인자로 반드시 SubmitHandler(validation 통과 됐을때의 콜백함수)를 써준다.
- 콜백함수가 비동기 함수인 경우 handleSubmit 함수가 따로 에러 핸들링을 하지 않으므로 try...catch 로 에러 핸들링을 해준다.

<br />
<br />

> `handleSubmit` 관련 예시 (1)

```tsx
const AuthForm = () => {

  const {
    //...
    handleSubmit,
    setError
  } = useForm<IAuthForm>({mode: 'onBlur'});

  // SubmitHandler
  const onValid = (data : IAuthForm) => {
	console.log("성공!")
  }

return (
  // handleSubmit함수를 onSubmit props로 보내준다
  <form onSubmit={handleSubmit(() => {
  	try {
      onValid()
    }catch(e){
      console.log(e)
    }

  )}>
  )
}

```

<br />

> `handleSubmit` 관련 예시 (2)

```js
//handleSubmit은 함수를 인자로 받으며 그 함수에 data라는 인자를 넘겨준다.
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="username" {...register("username")} />
        <input type="submit" />
      </form>
    </div>
  );
}
```

<br />
<br />

## useForm에서 에러 핸들링 하기

---

- `setError` : 옵션들
  - `첫번째 요소` : 에러 핸들링할 input 요소 이름
  - `shouldFocus` : 에러가 발생한 요소로 input으로 focus이동
  - `message` : 에러 메세지 텍스트

<br />
<br />

```tsx
const AuthForm = () => {

  const {
    //...
    handleSubmit,
    setError,
  } = useForm<IAuthForm>({mode: 'onBlur'});

  const onValid = (data : IAuthForm) => {
	if (data.pw !== data.pwConfirm) {
      setError(
        'pwConfirm', // 에러 핸들링할 input요소 name
        { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true }, // 에러가 발생한 input으로 focus 이동
      );
    }
  }

return (
  <form onSubmit={handleSubmit(() => {
  	try {
      onValid()
    }catch(e){
      console.log(e)
    }
  )}>
    <fieldset>
      <legend>회원가입</legend>
      <label>비밀번호 확인</label>
      <input {...register("pwConfirm")} />
    </fieldset>
  </form>
  )
}
```

<br />
<br />
<br />

# 중복 제출 방지하기

- `useForm`은 반환하는 객체의 formstate 속성은 양식이 현재 어떤 상태인지를 담고 있다.
  - `formState`으로 부터 isSubmitting 속성을 읽어서 양식이 현재 제출 중인지 아닌지를 알아 낼 수 있다.

> 중복 제출 방지 관련 코드

```js
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    // 여기서 현재 제출중인지 아닌지를 확인 할 수 있다.
    formState: { isSubmitting },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(JSON.stringify(data));
      })}
    >
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        placeholder="test@email.com"
        {...register("email")}
      />
      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}

export default Form;
```

<br />
<br />

# Watch를 이용해서 입력 여부 확인 하기

`watch`

- 지정된 인풋을 관찰하고, 그 값을 반환하여 랜더링 할 대상을 결정할 때 유용하다.
- `defaultValue`를 설정하여 값을 반환할 수 있다.
- `useForm`에 `defaultValues`로 정의가 되어 있다면, 첫번째 랜더링에서 `defaultValues`에 적용된 내용을 반환한다.

```
watch() : 모든 입력을 검증
watch(["name"]) : 여러 입력을 확인
watch("name") : 지정한 name 에 대한 입력 검증
```

<br />
<br />

`getValues()`

- `폼의 값을 읽을 때 사용`. watch 와 다르게 getValues​​ 는 `리랜더링을 일으키거나 입력값의 변화를 구독하지 않음`
  - `getValues​​()`: 폼의 전체 값
  - `getValues​​('test')`: 폼 안의 개별 인풋 값을 읽습니다. test
  - `getValues​​(['test', 'test1'])`: 인풋의 name 속성을 지정하여 여러 값을 읽는다.

<br />
<br />

> watch 관련 예시 (1)

```js
const onChangeContent = (e) => {
  e.target.value && watch("writer") && watch("password") && watch("title")
    ? setIsActive(false)
    : setIsActive(true);
};
```

<br />

> watch 관련 예시 (2)

```js
const watchAll = Object.values(watch());

useEffect(() => {
  if (watchAll.every((el) => el)) {
    setIsActive(true);
  } else {
    setIsActive(false);
  }
}, [watchAll]);
```

<br />
<br />

# 실시간으로 유효성 검사

> 실시간으로 유효성 검사를 하기 위해서 useForm을 다음과 같이 변경 해야한다. <br />

```js
useForm({ mode: "onChange" });
```

- `useForm을 위 처럼 변경하면, React Hook From이 실시간으로 유효성 검사를 하게 된다.`
- input에 Validation을 설정한 다음 useForm에서 error객체를 가져온다.

<br />

```
📌 errors는 에러들이 담긴 객체로 현재는 모드가 onChange이기 때문에 에러가 실시간으로 업데이트 된다.
```

<br />
<br />

> 관련 예시

```js
//handleSubmit은 성공,실패 두개의 인수를 넘길 수 있다.
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          type="text"
          placeholder="username"
          {...register("username", {
            minLength: {
              value: 5,
              message: "Username must be longer than 5 characters",
            },
          })}
        />
        <input type="submit" />
      </form>
      {erros && <h1>{error?.username?.message}</h1>}
    </div>
  );
}
```

<br />
<br />
<br />

# 전체 예시 코드

```js
import { useForm } from "react-hook-form";

function LoginForm({
  onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(data));
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        placeholder="test@email.com"
        aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
        {...register("email", {
          required: "이메일은 필수 입력입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />
      {errors.email && <small role="alert">{errors.email.message}</small>}
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="****************"
        aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
        {...register("password", {
          required: "비밀번호는 필수 입력입니다.",
          minLength: {
            value: 8,
            message: "8자리 이상 비밀번호를 사용하세요.",
          },
        })}
      />
      {errors.password && <small role="alert">{errors.password.message}</small>}
      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}

export default Form;
```
