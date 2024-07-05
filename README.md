# 노마드 코더 \_ TypeScript

# 1. 목적

JS의 약점중 하나가 부정확한 타입의 값(const, var, let)들로 사용되어 예상치 못한 오류가 발생하기도 함. 이러한 문제점을 TypeScript를 통해 보완을 하고 더 나은 개발과 앞으로의 프로젝트의 질을 높이기 위해 배움

# 2. 강의 기록

<details>

 <summary>자세히</summary>

## day 1 24.06.26

> 왜 typescript 인가?

- 기존 js는 변수를 선언 할 때 그 값의 타입을 정해주지 않는다. 그로인해
  여러가지 오류를 가져올수 있음. (어떤 오류인지를 알지 못하거나 인지하기가 어려움)
- typescript는 코드를 실행하기전 오류를 잡아줌

> 명시적 / 추론적

- typescript는 변수에 명시적으로 타입을 정해줌

```ts
let a: string = 'hello';
let array: number[] = [];
```

- 하지만 때로는 명시적으로 하지 않고 typescript가 직접 추론하게끔 하기도 함

```ts
// 코드를 이렇게 써도 됨
let b = 1;
b = 2;
```

- 즉 명시적으로 타입을 지정해야 할 때와 추론적일때를 잘 구분해서 사용해야 함

> 타입 지정

- 기본적인 타입들 (number , boolean, string...)도 있고 새로운 타입을 만들수 있음
- 타입을 정함 \_ 첫글자는 대문자

```ts

//alias 형식
type Hello = string;

//object 형식 _ 첫글자는 대문자
type Player = {
  name : string,
  age:number
}

//타입이 특정 값을 가지도록 할 수 있음
type Team = 'red' | 'blue' | 'yellow';


const a : Player {
  name : "김철수",
  age:25

}
```

- 선택적 타입 일 때는 ? 를 추가해준다

```ts

//object 형식
type Player = {
  name : string,
  age?:number
}

const a : Player {
  name : "김철수"
}
```

- 함수의 return 타입을 정해줄때

```ts
type Player = {
  name: string;
  age?: number;
};

function PlayerMaker(name: string): Player {
  return {
    name: string,
    // name >> 파라미터와 같은 타입일 경우 이렇게도 가능
  };
}

const ch = PlayerMaker('김철수');
```

**readonly**

- 지정된 타입의 값의 변경을 막을때

```ts
type Player = {
  readonly name : string,
  age?:number
}
const a : Player{
  name : "김철수",
}

// 이 코드는 오류를 발생시킴
a.name = "박철수"
```

**readonly Tuple**

- 항상 정해진 갯수의 요소를 가져야하는 array를 만들수 있음.
- 꼭 순서대로, 최소 정해진 타입 요소들을 가져야함

```ts
const arr: [string, number, boolean] = ['김철수', 12, true];
```

**any**

- typescript로 부터 벗어나는방법

```ts
const a: any = 1;
const b: any = true;

// 이 코드가 실행된다 _ 물론 오류(js가 되버림)
a + b;
```

**unknown**

- 해당 변수가 어떤 타입이 될지 모를때 사용 (API 요청시에 주로 사용되기도 함)

**void**

- 함수의 return 값이 없을때 사용하는 타입

```ts
// 명시적
function hi(): void {
  consol.log('ㅎㅇㅎㅇ');
}

// 이미 return값이 없음
function hi() {
  consol.log('ㅎㅇㅎㅇ');
}
```

**never**

- 잘 사용하지는 않지만 절대로 이 값을 그 어떠한 타입으로 받을수 없음을 나타냄

```ts
function name(name: string | number) {
  if (typeof name === 'string') {
    name; // 타입이 string일때
  } else if (typeof name === 'number') {
    name; // 타입이 number일때
  } else {
    name; // 사실상 절대로 실행 되지 않는 코드 (naver 타입임)
  }
}
```

> call Signature

- 함수에서 파라미터 값 타입과 리턴하는 값의 타입을 정해주는 방법 (Ailas와 비슷)

```ts
// 기존에 이렇게 쓰지만
const add = (a: number, b: number): number => {
  return a + b;
};

// 처음부터 명시해 줌으로써 작업의 효율을 높임
type Add = (a: number, b: umber) => number;

const add = (a, b) => a + b;
```

> overloading

- 함수의 파라미터 수가 다를때

```ts
type Add = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add: Add = (a, b, c?: number) => {
  if (c) return a + b + c;
  else return a + b;
};

add(1, 2);
add(1, 2, 3);
```

- 패키지나 라이브러리를 디자인할때 주로 사용됨

```ts
type Config = {
  path: string;
  state: object;
};

type Push = {
  (path: string): void;
  (config: Config): void;
};

const push: Push = (config) => {
  if (config === 'string') {
    consol.log(config);
  } else {
    consol.log(config.path);
    consol.log(config.state);
  }
};
```

> 다형성 / generic (placeholder타입)

- call Signature 에서 타입을 정해줄때 (파라미터 , 리턴값) 어떤 타입의 값이 올지(다양한 타입의 값들) 모를때 사용함
- **any** 타입을 쓰면 되지 않나 싶지만 그렇게 되면 typescript가 오류를 잡아주질 못함
- 정리하자면 제네릭(ex. `<T>`)을 사용함으로써 typescript에서 자동적으로 call Signature를 적용 시켜줌

```ts
type SuperPrint = {
  <T>(arr: T[]): T;
};

const superPrint: SuperPrint = (arr) => {
  return arr[0];
};

const a = superPrint(1, 2, 3);
const b = superPrint(true, false, true, false);
const c = superPrint('1,2,3', '4,5,6');
const d = superPrint(1, 'hello', trues);
```

- 그런데 위 코드를 아주 쉽게 간략하게 표현 할 수 있음

```ts
// 위 코드와 같다

function superPrint<T>(arr: T[]) {
  return arr[0];
}

const a = superPrint(1, 2, 3);
const b = superPrint(true, false, true, false);
const c = superPrint('1,2,3', '4,5,6');
const d = superPrint(1, 'hello', trues);
```

## day 2 24.06.28

> Class

⭐접근 제한자⭐

객체 지향 언어에서 쓰이는 접근제한자

- 접근 제한자를 명시하지 않았을 때는 *public*으로 지정
  - 다른 객체 지향 언어에서는 _protected_
- 메소드에도 접근 제한자를 사용할 수 있음

|   접근 가능성    | public | protected | private |
| :--------------: | :----: | :-------: | :-----: |
|   클래스 내부    |   O    |     O     |    O    |
| 자식 클래스 내부 |   O    |     O     |    X    |
| 클래스 인스턴스  |   O    |     X     |    X    |

**기본**

- class 안에 생성자를 작성할때 기존 JS 처럼 쓰지 않음
- 생성자 안에 접근제어자 , 이름 , 타입을 써주면 됨 (JS 에서 자동으로 초기화 됨)
- JS에서는 접근제어자가 안보임(TypeScript에서만 보호해 줌)

```ts
class Player {
  // 생성자
  constructor(private firstName: string, private lastName: string, public nickname: string) {}
}

const aaa = new player('김', '철수', 'ㅊㅅ');
```

**추상클래스 (abstract)**

- 다른 클래스가 상속받을 수 있는 클래스
- 단! 직접적으로 인스턴스를 만들지는 못 함. (오직 상속 받을 수만 있음)
- 이 클래스를 상속 받는 다른 클래스가 가질 property와 메소드를 지정해줌.  
  ⭐다른 클래스가 따라야 할 설계도를 만든셈

```ts
abstract class User {
  // 생성자
  constructor(private firstName: string, private lastName: string, public nickname: string) {}
  // 메소드
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// User(추상클래스)를 상속 받음
class Player extends User {}

// 직접적으로 인스턴스가 안됨
const abc = new User('김', '철수', 'ㅊㅅ'); // X
// 올바른 인스턴스
const abc = new Player('김', '철수', 'ㅊㅅ'); // O

// 상속 받았기 때문에 사용 가능
abc.getFullName();
```

**추상 메소드**

- 추상 클래스 안에서 추상 메소드를 만들수 있다.
- 추상 메소드를 만들때는 _메소드를 클래스 안에서 구현하지 않음_(안에 코드가 없음)
  ㄴ 대신에 call signature만 적어 줘야함
- 이후 상속 받는 Class애서 구현 해주어야함

```ts
abstract class User {
  constructor(protected firstName: string, protected lastName: string, protected nickname: string) {}

  // 추상 메소드
  abstract getNickName(): void;

  protected getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player extends User {
  // 상속받은 User의 추상 클래스를 구현 해야함
  getNickName() {
    this.getFullName();
    console.log(this.nicname);
  }
}
```

## day 3 24.07.04

> interfaces

TypeScript에서 오브젝트 형식으로 알려주는 방법은 두가지가 있다.

하나는 type

```ts
type Player = {
  nickname: string;
  team: string;
  health: number;
};
```

다른 하나는 interfaces

- interface는 오브젝트의 모양을 특정하기 위한 용도 (**오직 오브젝트로**)

```ts
interface Player {
  nickname: string;
  team: string;
  health: number;
}
```

즉 , type으로 오브젝트를 표현해도 되고 interface로 표현해도 됨. (단 interface는 오직 오브젝트를 표현함)

interface는 클래스처럼 상속을 할 수도 있음(문법 구조가 객체 지향 프록래밍 개념)

```ts
// 인터페이스
interface User {
  name: string;
}

interface Player extends User {}

// 타입으로도 상속이 가능함 (인터페이스와 모양이 다름)
type User = {
  name: string;
};

type Player = User & {};

const aaa: Player = {
  name: '철수',
};
```

또한 property 들을 축적 할 수 있다.(type은 안됨)

```ts
interface User {
  name: string;
}

interface User {
  lastname: string;
}

interface User {
  nickname: string;
}

const aaa: User = {
  name: '철수',
  lastname: '수',
  nickname: 'ㅊㅅ',
};
```

⭐ 인터페이스는 가볍다, 컴파일을 하게 되면 JS로 바뀌지 않고 사라짐 ⭐

앞서 했던 추상클래스를 인터페이스로 만드는 예제

```ts
interface User {
  firstName: string;
  lastName: string;
  sayHi(name: string): string;
  fullName(): string;
}

class Player implements User {
  constructor(public firstName: string, public lastName: string) {}
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  sayHi(name: string) {
    return `Hello ${name}, My name is ${this.fullName()}`;
  }
}

 //인터페이스를 argument에 설정할 수도 있고 , return 형식으로도 사용할 수 있음

function makeUser(user: User) {
  return ' hi';
}

makeUser({
  firstName: "철수";
  lastName: "수";
  fullName(): "xx";
  sayHi(name): "string";
})


```

## day 4 24.07.05

> type 과 interface Recap

- 대부분의 typescript의 커뮤니티(?)에서는 **클래스나 오브젝트의 모양을 정의 하고싶으면** `interface`를 사용하고 **나머지는** `type`을 쓰라고 권장함
  - 나머지: 타입 alias / 특정 값으로 타입을 제한 하는 경우 ---

```ts
// type
type User = string;

type Number = 1 | 2 | 3;

type Obj = {
  name: string;
  age: number;
  nickName: string;
};

// 상속 할 때
type PlayerA = {
  name: string;
};

type PlayerAA = PlayerA & {
  lastName: string;
};

const aaa: PlayerAA = {
  name: '김철수',
  lastName: '수',
};

////////////////////////////

// interface
interface User {
  name: string;
}

interface User {
  lastName: string;
}

interface Player extends User {
  age: number;
}

const bbb: Player = {
  name: '철수',
  lastName: '수',
  age: 10,
};
```

> 배운것을 토대로 API 구조를 만들어보자

```ts
interface SStorage<T> {
  [key: string]: T;
}

class LoclaStorage<T> {
  constructor(protected name: string, protected num: number) {}

  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
    console.log(`${this.num}살 ${this.name}님 입력 됐습니다.`);
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
    console.log(`${this.name}님 삭제 됐습니다.`);
  }
}

const stringsStorage = new LoclaStorage<string>();

stringsStorage.set('name', '김철수');
stringsStorage.set('nickName', 'ㅊㅅ');
stringsStorage.get('xxx');
stringsStorage.remove('nickName');

const booleanStorage = new LoclaStorage<boolean>('김철수', 10);
booleanStorage.set('김치', true);
booleanStorage.set('가지', false);
booleanStorage.get('불고기');
booleanStorage.remove('가지');
booleanStorage.clear();
```

> typescript

**설치**

- `npm i -D typescript`

**package.json 초기화**

- `npm init -y`

**tsconfig.json 설정**

- 프로젝트를 컴파일 하는데에 필요한 루트파일과 컴파일러 옵션을 지정함

**1) target**

- typescript가 JS로 컴파일할 때 그 환경에 맞춰 컴파일함
  - 기본값 : ES3 (ES6으로 대부분 함)

**2) lib**

- 타입스크립트가 어떤 API를 가지고 어떠한 환경에서 코드를 실행하는 지를 지정할 수 있음. (target 런타임 환경이 무엇인지 정함)
- 브라우저에서 실행한다면 lib에 "DOM" 을 정의 할 수 있음

**3) strict**

- strict 를 ture로 지정하면 (기본값 false) 엄격하게 타입 검사 옵션을 활성화 함
  - 매우 광범위하고 프로그램 정확성을 높임

**4) JSDoc**

- 이미 JS에서 많은 코드를 짰는데 타입스크립트의 영향을 받고 싶다면 사용 하는 것
- 사용방법 : JS 파일 첫줄에 주석으로 @ts-check을 써주면 됨  
  이후 JSDoc 주석을 활용해서 JS에 type 정보를 제공할 수 있음
- 개발자 입장에서 오류가 보일뿐 JS를 실행하는데에 있어서 문제가 되지 않음

> DefinitelyTyped

- 타입스크립트의 type 정의를 위한 깃 리포지토리
- 가끔 import 했을때 타입스크립트가 이해를 못 하는 오류가 발생함
  그떄 리포지토리에서 확인! 👉 [Link](https://github.com/DefinitelyTyped/DefinitelyTyped)
- `npm i @types/node -D` 해주면 됨!

> typescript로 블록체인 만들기

- src/index.ts 코드 참고

<details>

 <summary>자세히</summary>

```ts
import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(public readonly prevHash: string, public readonly height: number, public readonly data: string) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  // Hash 생성하는 부분
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  // 블럭의 초기값 설정
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  //해쉬의 이전 값을 가져옴 길이가 0이면 '' / 그게 아니면 이전 값을 가져옴
  private getPrevHash() {
    if (this.blocks.length === 0) {
      return '';
    }
    return this.blocks[this.blocks.length - 1].hash;
  }

  // 블록을 추가함
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }

  // 현재 가지고 있는 블록을 받아옴
  public getBlock() {
    return [...this.blocks]; // 새로운 배열로 리턴해줌
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('1블럭');
blockchain.addBlock('2블럭');
blockchain.addBlock('3블럭');

console.log(blockchain.getBlock());
```

</details>

</details>

# 2. 느낀점

<details>

 <summary>자세히</summary>

이번에 typescript를 배우면서 많은 것을 얻어 가고 느꼈다. 강의를 듣기 전에 내 생각으론, typescript를 쓰는 이유가 단지 JS에서 타입을 정해주어 개발하는 입장에 오류를 잘 잡아주기 위함에 사용하는 줄만 알았다. 하지만 typescript는 그 정도로 끝나지 않고 더 광범위하게 더 폭발적으로 도움을 준다. typescript는 객체 지향 언어이기 때문에 그 특성과 매우 흡사하게 타입을 지정한다. interface와 type은 서로 같으면서도 다른 부분들이 있기에 각자 사용처에 맞게 쓴다면 최고로 좋은 개발 경험을 할 수 있다. 뿐만 아니라 이전에 배웠던 객체 지향 언어(C++, C#, JAVA)에서 까먹은 부분들을 다시 한번 상기하게 됐고 새로운 것을 배움과 동시에 복습하는 시간이기도 해서 매우 뜻깊고 좋았다. 앞으로 프로젝트를 할 때 이번 배움을 토대로 JS가 아닌 typescript로 프로젝트를 해야겠다.

</details>
