---
id: golang-10
sidebar_position: 10
---

# 標準ライブラリを使ったファイル操作とJSONの読み書き

```go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "os"
)

// Person構造体の定義
type Person struct {
    Name   string `json:"name"`
    Age    int    `json:"age"`
    Gender string `json:"gender"`
}

func main() {
    // データを含むスライスを作成
    people := []Person{
        {"田中太郎", 30, "男性"},
        {"山田花子", 25, "女性"},
        {"鈴木次郎", 28, "男性"},
    }

    // データをJSON形式でファイルに書き込む
    filename := "people.json"
    err := writeJSON(filename, people)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    fmt.Println("データをファイルに書き込みました:", filename)

    // ファイルからデータを読み込む
    loadedPeople, err := readJSON(filename)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    fmt.Println("ファイルからデータを読み込みました:")
    for _, person := range loadedPeople {
        fmt.Printf("名前: %s, 年齢: %d, 性別: %s\n", person.Name, person.Age, person.Gender)
    }
}

// JSONファイルにデータを書き込む関数
func writeJSON(filename string, data interface{}) error {
    // データをJSONにエンコード
    jsonData, err := json.MarshalIndent(data, "", "    ")
    if err != nil {
        return err
    }

    // ファイルに書き込む
    err = ioutil.WriteFile(filename, jsonData, 0644)
    if err != nil {
        return err
    }

    return nil
}

// JSONファイルからデータを読み込む関数
func readJSON(filename string) ([]Person, error) {
    // ファイルが存在するか確認
    if _, err := os.Stat(filename); os.IsNotExist(err) {
        return nil, fmt.Errorf("ファイルが存在しません: %s", filename)
    }

    // ファイルからデータを読み込む
    jsonData, err := ioutil.ReadFile(filename)
    if err != nil {
        return nil, err
    }

    // JSONデータをデコード
    var people []Person
    err = json.Unmarshal(jsonData, &people)
    if err != nil {
        return nil, err
    }

    return people, nil
}
```

---

**解説:**

このコード例では、Goの標準ライブラリを使って**ファイル操作**と**JSONの読み書き**を行う方法を学びます。具体的には、構造体のデータをJSON形式でファイルに書き込み、ファイルからデータを読み込んで復元します。

1. **必要なパッケージのインポート**

   ```go
   import (
       "encoding/json"
       "fmt"
       "io/ioutil"
       "os"
   )
   ```

   - **`encoding/json`パッケージ**: JSONのエンコードとデコードを行います。
   - **`io/ioutil`パッケージ**: ファイルの読み書きに便利な関数を提供します。
   - **`os`パッケージ**: ファイルやシステム操作に関する機能を提供します。

2. **`Person`構造体の定義**

   ```go
   type Person struct {
       Name   string `json:"name"`
       Age    int    `json:"age"`
       Gender string `json:"gender"`
   }
   ```

   - **タグの指定**: フィールドに`json:"name"`のようなタグを付けることで、JSONのキー名を指定できます。
   - **大文字で始まるフィールド**: JSONのエンコード・デコードでは、エクスポートされたフィールド（大文字で始まる）である必要があります。

3. **データの作成**

   ```go
   people := []Person{
       {"田中太郎", 30, "男性"},
       {"山田花子", 25, "女性"},
       {"鈴木次郎", 28, "男性"},
   }
   ```

   - **`Person`のスライス**: 複数の`Person`オブジェクトを持つスライスを作成します。

4. **JSONファイルへの書き込み**

   ```go
   err := writeJSON(filename, people)
   ```

   - **`writeJSON`関数の呼び出し**: データをファイルに書き込みます。
   - **エラーチェック**: エラーが発生した場合はメッセージを表示して終了します。

5. **JSONファイルからの読み込み**

   ```go
   loadedPeople, err := readJSON(filename)
   ```

   - **`readJSON`関数の呼び出し**: ファイルからデータを読み込みます。
   - **データの表示**: 読み込んだデータをコンソールに出力します。

6. **`writeJSON`関数の実装**

   ```go
   func writeJSON(filename string, data interface{}) error {
       // データをJSONにエンコード
       jsonData, err := json.MarshalIndent(data, "", "    ")
       if err != nil {
           return err
       }

       // ファイルに書き込む
       err = ioutil.WriteFile(filename, jsonData, 0644)
       if err != nil {
           return err
       }

       return nil
   }
   ```

   - **`json.MarshalIndent`関数**: データを整形されたJSON文字列にエンコードします。
     - 第1引数: エンコードするデータ。
     - 第2引数: プレフィックス（通常は空文字列）。
     - 第3引数: インデント文字列（ここでは4つのスペース）。
   - **`ioutil.WriteFile`関数**: ファイルにデータを書き込みます。
     - 第1引数: ファイル名。
     - 第2引数: 書き込むデータ（バイトスライス）。
     - 第3引数: ファイルのパーミッション。

7. **`readJSON`関数の実装**

   ```go
   func readJSON(filename string) ([]Person, error) {
       // ファイルが存在するか確認
       if _, err := os.Stat(filename); os.IsNotExist(err) {
           return nil, fmt.Errorf("ファイルが存在しません: %s", filename)
       }

       // ファイルからデータを読み込む
       jsonData, err := ioutil.ReadFile(filename)
       if err != nil {
           return nil, err
       }

       // JSONデータをデコード
       var people []Person
       err = json.Unmarshal(jsonData, &people)
       if err != nil {
           return nil, err
       }

       return people, nil
   }
   ```

   - **`os.Stat`関数**: ファイルやディレクトリの情報を取得します。
     - ファイルが存在しない場合、エラーを返します。
   - **`ioutil.ReadFile`関数**: ファイルの内容を読み込みます。
   - **`json.Unmarshal`関数**: JSONデータをデコードして、指定した型の変数に格納します。

8. **エラーハンドリング**

   - すべての関数でエラーが発生した場合、適切に処理しています。
   - エラーが発生した場合はエラーメッセージを表示し、プログラムを終了します。

---

**実行方法:**

1. 上記のコードを`file_json.go`というファイル名で保存します。

2. ターミナルで保存したディレクトリに移動します。

3. 以下のコマンドを実行します:

   ```bash
   go run file_json.go
   ```

4. 実行結果は以下のようになります:

   ```
   データをファイルに書き込みました: people.json
   ファイルからデータを読み込みました:
   名前: 田中太郎, 年齢: 30, 性別: 男性
   名前: 山田花子, 年齢: 25, 性別: 女性
   名前: 鈴木次郎, 年齢: 28, 性別: 男性
   ```

5. 同じディレクトリに`people.json`というファイルが作成され、内容は以下のようになります:

   ```json
   [
       {
           "name": "田中太郎",
           "age": 30,
           "gender": "男性"
       },
       {
           "name": "山田花子",
           "age": 25,
           "gender": "女性"
       },
       {
           "name": "鈴木次郎",
           "age": 28,
           "gender": "男性"
       }
   ]
   ```

---

**ポイント解説:**

- **ファイル操作**

  - **ファイルの読み書き**

    - **`ioutil.WriteFile`**: 簡単にファイルにデータを書き込むことができます。
    - **`ioutil.ReadFile`**: ファイルからデータを読み込む際に使用します。

  - **ファイルの存在確認**

    - **`os.Stat`**: ファイルやディレクトリの情報を取得します。
    - **`os.IsNotExist(err)`**: エラーが「ファイルが存在しない」場合に`true`を返します。

- **JSONのエンコードとデコード**

  - **エンコード**

    - **`json.Marshal`**: データをJSON形式にエンコードします（整形なし）。
    - **`json.MarshalIndent`**: 整形されたJSONデータを生成します。

  - **デコード**

    - **`json.Unmarshal`**: JSONデータを指定した型の変数にデコードします。

  - **タグの使用**

    - フィールドにタグを付けることで、JSONのキー名を指定したり、エンコード・デコードの挙動を制御できます。

- **エラーハンドリング**

  - **エラーの伝播**

    - エラーが発生した場合、関数内で処理せずに呼び出し元にエラーを返します。

  - **`fmt.Errorf`関数**

    - カスタムエラーメッセージを作成する際に使用します。

- **`interface{}`の使用**

  - **汎用データ型**

    - `writeJSON`関数では、データの型を`interface{}`とすることで、任意の型のデータを受け取れるようにしています。

---

**まとめ:**

この例では、Goの標準ライブラリを使ってファイル操作とJSONの読み書きを行う方法を学びました。構造体のデータをJSON形式でファイルに書き込み、ファイルからデータを読み込んで復元する方法を理解しました。また、ファイルの存在確認やエラーハンドリングなど、実用的なプログラムを作成する上で重要なポイントも解説しました。