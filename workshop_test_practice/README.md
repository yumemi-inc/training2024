
# テスト研修

この研修ではソフトウェア開発におけるテストの概念、テストの実装について学習する研修です。
前半/後半に分かれております。

# 後半のアジェンダ
- 静的コード解析について(10分)
- 単体テストを書いてみよう(45分)
- 結合テストを書いてみよう（30分）
- ビジュアルリグレッションテスト/E2Eについて（10分）
- まとめ


<details>
<summary>静的コード解析</summary>

## 静的コード解析

- 静的コード解析とは、実行ファイルを実行することなコードの解析を行うことです。
    - 主にツールを使って、文や定数宣言、式だけを解析するものからプログラム全体を解析するものまで様々な種類があります。
    <!-- WIP:ソフトウェアとハードウェアでのコード解析の事例に軽く触れる -->
- 静的コード解析のメリット
    - 実行前やコーディング作業中において解析結果を確認することができるので、エラーを未然に防ぐ効果があります。
    <!-- WIP様々なプログラム言語で検知するコードの例を記載する -->
    - 開発の初期段階において問題を特定して、バグの早期発見につながります。
    - コードの品質を最低限保つことで、品質担保にもつながります。
        - コードレビュー時にケアレスミスなどのレビューをしなくてすむ。
    - 実行ファイルを事前に確認できるので、開発効率の向上にもなります。

### eslint,prettier,biome

今回フロントエンドにおける静的解析のライブラリをいくつか紹介します。

まずライブラリを使わない一般的な静的解析としてTypeScriptについてみていきます。以下のコードを見てみましょう。

```ts
// 正しい関数の定義: 数値を受け取り、それを文字列として返す
function numberToString(n: number): string {
    return n.toString();
}

// エラーを含む使用例: 文字列を数値として扱おうとしている
const myNumber: number = "123"; // エラー: 型 'string' を型 'number' に割り当てることはできません。

// 関数の呼び出しでの型エラー
console.log(numberToString("456")); // エラー: 引数の型が 'number' である必要がありますが、型 'string' が与えられています。

// 正しい使用例
const myString: string = numberToString(123);
```

- この例では、numberToString関数の引数にnumber型をセットすることができます。しかしここで誤ってstring型をセットするとエディタ上でエラーを表示してくれます。これが最低限の静的解析になります。TypeScriptでは、コンパイラーで実行ファイルを実行する前に、事前にエラーがある時はエラーを表示してくれます。


```ts
// インターフェースの定義
interface Person {
    name: string;
    age: number;
}

// オブジェクトの定義: 正しい構造
const person: Person = {
    name: "Alice",
    age: 30
};

// エラーを含むオブジェクトの定義: `age` プロパティが足りない
const anotherPerson: Person = {
    name: "Bob"
    // エラー: プロパティ 'age' が型 'Person' には必須ですが、型 '{}' には存在しません。
};

```

上記の例では、NumberやStringと言ったプリミティブな値ではなくオブジェクトについて型を自分で定義して使用することも可能です。例の場合anotherPersonにはageのプロパティが定義されていますが、設定がなくエラーになっています。

また、VSCodeなどをお使いの場合補完機能も搭載されており、必要なプロパティをサジェストしてくれます。

- [ESLint](https://eslint.org/)
    - JavaScript/TypeScriptコードのための静的解析ツールです。可能な問題を特定し、コードスタイルの問題やプログラミングエラー、バグの可能性があるパターンを報告します。プロジェクトに応じてルールをカスタマイズすることができます。
    -  [ESLint Play](https://eslint.org/play/)
    <!-- WIP ESLintPlaygroundでいくつかミニテストをする  -->

- [Prettier](https://prettier.io/)
    - コードフォーマッタです。一貫したスタイルでコードを自動的に整形し、書き方の違いによる差異をなくします。ESLintと異なり、Prettierはコードスタイルに重点を置いており、構文エラーやバグの検出は行いません。
    - TypeScript/JavaScript以外でも様々なファイルをフォーマットできます。
    - メリット
        - 決めたルールに沿ってコーディングに品質を統一できる
        - コードレビュー時にケアレスミスなどのレビューをしなくてすむ。
    - ESLintとの競合
        - コードスタイルのルールがESLintと競合するケースがあり、ハマってしまうと修復に時間が掛かる
    - [prettier playground](https://prettier.io/playground)
    <!-- WIP Playgroundでいくつかミニテストをする -->

- [Biome](https://biomejs.dev/)
    - 静的解析とフォーマットがひとつになったライブラリ。簡単な設定でかつ素早く解析とフォーマットを行ってくれます。
    現状、解析ファイルが少ないので、実用的ではないが今後第三の目ということで注目が集まっています。

## プラクティス
静的解析を導入することで何が嬉しいのかどういう効果があるのか書いてみましょう！
</details>

<details>
<summary>単体テストワーク</summary>

## ワーク：単体テスト

- これから簡単なTODOアプリケーションを動かしていただきロジックのテストを記述してもらいます。
- 今回のワークで使う作業環境は以下のディレクトリ配下のものになります。
    - /workshop_test_practice/workshop_unit_test_app
- 結合テストのワークもこちらの環境を使っていきます。

### 事前の環境準備
以下の環境をご用意ください。
- Node.js v20.11.1
- npm

### テストで使用するライブラリについて
- 今回は[vitest](https://vitest.dev/)というライブラリを使っています。
- [API](https://vitest.dev/api/)を確認しつつテストを構築していきます。


### まずは起動させてみよう
- READMEを確認して、アプリケーションの環境を構築しましょう

```
# パッケージのインストール
npm init

# アプリケーションの起動
npm dev

# テストの実行
npm test
```

### まずはアプリケーションの動作を確認しましょう

- タスクを追加
- タスクを完了させる
- タスクを削除
- タスクを降順昇順に切り替える
- タスクの状況を絞り込む

### 単体テストの実装ファイル

以下に今回のTodoアプリを構築したコンポーネントとテストファイルがあります。

```
/workshop_test_practice
└── workshop_unit_test_app
    └── app
        └── components
            └── todo
                ├── todo.tsx // UIコンポーネントファイル
                ├── useTodo.tsx // Todoアプリのロジックファイル
                └── todo.spec.ts // テストファイル→こちらにテストを追加していきます。

```


### まずは、どんな機能にテストを追加するか書き出してみましょう



### todo.spec.tsの中身を確認しましょう

- サンプルでひとつタスク追加のテストを用意しています。

```ts
import { describe, it, expect } from "vitest";
import { Todo, addTodo, removeTodo, sortTodoByDueDate, formatDate, setDueDateForTodo, filterTodo } from "./useTodo";

describe("Todoリストに追加", () => {
    it("タスク名とタスク実行日からタスクが生成できること", () => {
        const todo: Todo[] = [];
        const itemText = "Test Todo";
        const dueDate = "2023-01-01";
        const newTodo = addTodo(todo, itemText, dueDate);
        expect(newTodo).toHaveLength(1);
        expect(newTodo[0]).toHaveProperty("text", itemText);
        expect(newTodo[0]).toHaveProperty("dueDate", dueDate);
    });

    it("タスク名とタスク実行日のいずれかが空であればタスクは生成されないこと", () => {
        const todo: Todo[] = [];
        const newTodo = addTodo(todo, "", "");
        expect(newTodo).toHaveLength(0);
    });
});
;


```

- npm run testを実行しましょう
- 以下の出力になると思います。

```shell
 RERUN  app/components/todo/todo.spec.ts x2

 ✓ app/components/todo/todo.spec.ts (2)
   ✓ Todoリストに追加 (2)
     ✓ タスク名とタスク実行日からタスクが生成できること
     ✓ タスク名とタスク実行日のいずれかが空であればタスクは生成されないこと

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  15:34:43
   Duration  13ms

```
今回のテストは、タスクを追加するときのテストになります。
- タスク名とタスクの実行日の両方の入力を受取りタスクを作られない
- タスク名とタスクの実行日のいずれかが空の場合はタスクは作られない

※更に拡張としてタスクが作られたことを確認するためにDOMを指定して、表示されているかの確認もできますが、今回はロジックに限定するため行いません。


### 書き出したテストについて雛形を使いながらテストコードを書いていこう（30分）

- Todoリストに追加のテストケースを雛形に、書き出したテストコードを書いていきましょう。

### テストコードの書き方手順
1. テストしたい関数のコードを確認して、必要な引数やI/Oを用意する
2. テストに必要な項目を書き出してテストケースを記述する（[VitestのAPI](https://vitest.dev/api/)を参照する）
3. `npm run test`を実行してテストが通るか確認する。（随時起動していると失敗時にエラーが表示されるので起動したままにしておくと良いです。）


### 解答のサンプル例
- スライドでサンプルを共有します。
- CI/CDを使っててnpm run testをインテグレーションに組み込むことでテストが失敗したものは、コミットできないようにするなどを行うとよりバグの少ない、品質の高いソースコードになると思います。

</details>

<details>
<summary>結合テストのワーク</summary>

### 改めて結合テストとは？

結合テストとは、複数のモジュールやコンポーネントを結合して、それらが連携して正しく動作するかを検証するテストを指します。

結合テストの目的は、異なるシステムのモジュールが統合された際に、仕様や要件に沿って機能することを保証することにあります。これは、個々のモジュールが単体で正しく機能する（単体テストを通過する）ことを確認した後のステップとして行われます。

## E2Eテストとの違いは？

E2Eテストはアプリケーション全体の品質を確認するものになり、結合テストよりより広範囲なテストプロセスになります。本番環境と近い環境でテストを実施するため外部アプリケーションとのつなぎ込みなども含めて行います。

## 今回行う結合テスト

- 先ほどのaddTodo関数をAPIにPOSTする関数に変更して、正常系、異常系のテストを書いてみましょう。
- Next.jsのAPI Routesという機能を使って簡単なAPIを用意し、APIをモック化してテストをします。

## モック化って何？
- モック化（Mocking）は、テスト対象の外部依存関係を模倣（モック）するテクニックです。テストを簡素化し、テスト実行速度を向上させることで、外部システムの不安定さやアクセス不能から独立してテストを行うことができます。
- APIをモック化することで、実際のバックエンドサービスを使用せずに、特定のAPI応答を模倣してフロントエンドの振る舞いをテストすることができます。

今回は以下のようなコードを利用してモック化を行います。

```ts

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, text: "Test Todo", dueDate: "2023-01-01", completed: false }),
    });
});


```

## API Routes

API Routesとは、Next.jsに内包された機能です。/api/*の中格納することで各エンドポイントになり、APIを実装することができます。
- 今回は、/app/api/todo/route.tsというファイルに簡単なGET、POST処理を記述しています。
- DB保存などの機能はないので、ローカル環境の起動中のみ有効になります。

```ts
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../../components/todo/useTodo";

const todo: Todo[] = [];

// useTodo.tsのgetTodo関数と同様の処理をAPI化
export function GET(req: NextRequest) {
    const res = NextResponse.json({ todo });
    return res;
}

// useTodo.tsのaddTodo関数と同様の処理をAPI化
export async function POST(req: NextRequest) {
    const data: Todo = await req.json();
    const { text, dueDate } = data;
    if (!text.trim() || !dueDate) {
        return todo;
    }
    const newTodo: Todo = {
        id: Date.now(),
        text,
        dueDate,
        completed: false,
    };
    todo.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
}

```

## 実際にコンポーネントで呼び出してみよう

`useTodo.ts`内の以下のコメントアウトを解除

```ts
// /**
//  * タスクをAPI経由で追加します。
//  * @param {Todo[]} todo - タスクのリスト。
//  * @param {string} inputText - タスクのテキスト。
//  * @param {string} dueDate - タスクの期限日。
//  * @returns {Promise<Todo>} - 追加されたタスク。
//  */
// export const postAddTodo = async (todo: Todo[], inputText: string, dueDate: string): Promise<Todo> => {
//     const response = await fetch("/api/todo", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ todo, text: inputText, dueDate }),
//     });

//     if (!response.ok) {
//         // エラーレスポンス時にエラー情報を含む例外を投げる
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Something went wrong");
//     }

//     const data = await response.json();
//     return data;
// };

```

`todo.tsx`のimportを以下の様に修正

```diff
- import { useState, ChangeEvent, FC } from "react";
import {
    Todo,
-   addTodo,
-   getTodo,
    removeTodo,
    sortTodoByDueDate,
    formatDate,
    toggleCompleted,
    setDueDateForTodo,
    filterTodo,
    FilterType,
} from "./useTodo";

+ import { useState, ChangeEvent, FC, useEffect } from "react";
import {
    Todo,
    removeTodo,
    sortTodoByDueDate,
    formatDate,
    toggleCompleted,
    setDueDateForTodo,
    filterTodo,
    FilterType,
+   postAddTodo,
} from "./useTodo";

```

getTodo関数が不要になったため削除
```diff
- const [todo, setTodo] = useState<Todo[]>(getTodo());
+ const [todo, setTodo] = useState<Todo[]>([]);
```

useEffectを追加

```diff
const [dueDate, setDueDate] = useState<string>("");

+ useEffect(() => {
+    fetchTodo();
+ }, []);

```
handleAddTodo関数とfetchTodo関数を変更追加する

```diff
- const handleAddTodo = () => {
-   const updatedTodo = addTodo(todo, inputText, dueDate);
-   setTodo(updatedTodo);
    setInputText("");
    setDueDate("");
};


+ const handleAddTodo = async () => {
+   await postAddTodo(todo, inputText, dueDate);
+   fetchTodo();
    setInputText("");
    setDueDate("");
};

+  const fetchTodo = async () => {
+   const res = await fetch("/api/todo");
+   const data = await res.json();
+   setTodo(data.todo);
+  };

```

- 上記を修正したら一度`npm run dev`をしましょう。


## POST処理のテストを書く前にどんな方法でテストすればよいか考えましょう。（5分）

## 考えられるテスト

- 引数が正しいか
- Methodが正しいか（POSTになっているか）
- ヘッダー情報が正しいか
- bodyリクエストが正しいか
- リクエストした値が正しく反映されているか


## 正常系のテストを書いてみよう
実際にテストをしたい値を定数として定義する

```ts

describe("postAddTodo", () => {
    it("新規のタスクをAPIに保存する", async () => {
        const mockText = "Test Todo";
        const mockDueDate = "2024-03-01";
    });
});
```

APIの関数を呼び出し、実際にその値が正しく反映されているかをチェックする処理を書きます。

```ts

describe("postAddTodo", () => {
    it("新規のタスクをAPIに保存する", async () => {
        const mockText = "Test Todo";
        const mockDueDate = "2024-03-01";

        const responseData = await postAddTodo([], mockText, mockDueDate);

        expect(fetch).toHaveBeenCalledWith("/api/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ todo: [], text: mockText, dueDate: mockDueDate }),
        });

        expect(responseData).toEqual({ id: 1, text: "Test Todo", dueDate: "2024-03-01", completed: false });
    });
});

```

- `npm run test`を実行して成功するか確認しましょう！
- 以下のように`id`や他の値を変更してみましょう！

```diff
- expect(responseData).toEqual({ id: 1, text: "Test Todo", dueDate: "2024-03-01", completed: false });
+ expect(responseData).toEqual({ id: 2, text: "Test Todo", dueDate: "2023-01-01", completed: false });

```

### 異常系のテストを書いてみよう！

- 以下のように記述ができます。
- describeの中でbeforeEachを書くことで、元々のbeforeEachのモックと干渉しない
- `vi.resetAllMocks();`でモックの状態をresetすることができます。


```ts
describe("postAddTodo Error Handling", () => {
    beforeEach(() => {
        global.fetch = vi.fn().mockRejectedValue({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ message: "Server error" }),
        });
    });

    it("todoの引数が空の場合エラーになる", async () => {
        // fetchの呼び出し前にモックをリセット
        vi.resetAllMocks();

        // モック関数を再設定
        global.fetch = vi.fn().mockRejectedValue(new Error("Server error"));

        await expect(postAddTodo([], "Test Todo", "2023-01-01")).rejects.toThrow("Server error");
    });
});

```

## 結合テストの大事さ

- フロントエンド、バックエンド限らずそれぞれの機能を動かすと思わぬ不具合を起こすことがあります。
- 早い段階でテストケースを作っておくことで未然に不具合を防ぐことができます。

## Mock Service Worker

- 今回は実際のAPIをモック化しましたが、API自体をモックとしてテストにも使える[Mock Service Worker（MSW）](https://mswjs.io/)などのライブラリがあります。
- まだAPIの開発が終わっていないなど先行してレスポンスやリクエストの型が分かれば先行してAPIの結合テストが書けるのでおすすめです。

</details>


<details>
<summary>ビジュアルリグレッションテスト（VRT）/E2E</summary>

## ビジュアルリグレッションテスト（VRT）とは

ウェブアプリケーションやモバイルアプリケーションの画面が期待通りに表示されるかどうかを自動的に検証するテスト手法です。レイアウトのズレやスタイルの不具合をピクセル探知で検知できます。

### VRTのメリット

- 精度: ピクセルレベルでの変更を検出できるため、微細なUIの変更も検知できます。
- 自動化: 手動でのUIテストに比べて、時間とコストを大幅に削減できます。
- 差分: スクリーンショットがあるのでどのタイミングで不具合が起きるのかを細かく確認できます。


### VRTのデメリット

環境差異: 異なるデバイスやブラウザでのレンダリングの違いが誤検出を引き起こす可能性があります。
動的コンテンツの検知: ユーザーのアクションによって変わる動的なコンテンツの扱いが難しい場合があります。
アラート: 微細な変更でもアラートを発するため、重要な変更を見逃してしまうことがあるかもしれません。

### 有名なものに以下があります。
- [reg-suit](https://reg-viz.github.io/reg-suit/)
- [Chromatic](https://www.chromatic.com/)
- [Playwright](https://playwright.dev/)

##  End-to-end(E2E)とは

E2Eテストはアプリケーション全体の品質をウォークスルーで確認できる全域テストになります。GUI上でアプリケーションを立ち上げテストを書けたり、実際の挙動を録画してテストを実行したりと非エンジニアでも使えるものがあります。

## E2Eのメリット

- 精度: クロスブラウザでチェックしたり、ウェブ・モバイル両方のテストを記述できたりと品質担保に繋がります。
- 自動化: 非エンジニアがテストケースを書くことが比較的簡単で、操作性が良いです。
- 全域テスト：外部のアプリケーションとの結合含めた広範囲のテストが実施できます。

## E2Eのデメリット
- コスト：テストケースの量やテストの実施回数によってプランがあり、大規模アプリケーションの場合コストが掛かることがあります。
- テストケースの複雑性：UIの変更があったときなどにテストが失敗するケースが多く運用が大変です。

### 有名なものに以下があります。
- [Autify](https://autify.com/)
- [Magicpod](https://magicpod.com/)
- [mabl](https://www.mabl.com/ja/)
- [Playwright](https://playwright.dev/)

</details>


<details>
<summary>まとめ</summary>

これで研修は終了です。お疲れ様でした。

### まとめ
- まずはテストしたい項目をリスト化することが大事！！
- 単体テストはロジック一つ一つの品質を向上するもの
- 結合テストは単体テストでしっかりテストされたものがちゃんと他のものとつなぎ合わせたときに動作するかどうかをテストするもの
- テストを書くことで実装すべきものの本質が見えてくる


最後にt_wadaさんのブログを紹介します


</details>
