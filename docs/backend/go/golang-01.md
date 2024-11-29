---
title: Go言語の基礎文法
description: Go言語の基礎文法についてまとめました。
tags:
  - Go
---

Go言語（Golang）はシンプルで効率的な設計が特徴のプログラミング言語です。その基礎文法について、以下にまとめました。

---

## **1. 基本構造**
Goプログラムは、パッケージ宣言から始まり、必要なパッケージをインポートします。その後、`main`関数がエントリーポイントになります。

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

- `package main` は、実行可能なプログラムであることを示します。
- `import` は、他のパッケージを利用するために使用します。
- `fmt.Println` は標準出力に文字列を表示します。

---

## **2. 変数と型**
### **変数の宣言**
Goでは型を明示的に指定するか、`:=`を使って<ruby>暗黙的<rt>あんもくてき</rt></ruby>に型を推論します。

```go
// 明示的な型指定
var a int = 10
var b string = "Hello"

// 型推論
c := 20
d := "World"
```

### **データ型**
| 種類           | 型           | 例                   |
|----------------|--------------|----------------------|
| 整数           | `int`, `uint` | `int32`, `uint64`など |
| <ruby>浮動<rt>ふどう</rt></ruby>小数点数   | `float32`, `float64` | `3.14`            |
| 論理値         | `bool`       | `true`, `false`     |
| 文字列         | `string`     | `"Hello"`           |
| 配列、スライス | `[N]T`, `[]T`| `[5]int` (配列), `[]int` (スライス) |
| マップ         | `map[K]V`    | `map[string]int`    |

---

## **3. <ruby>制御<rt>せいぎょ①</rt></ruby>構文**
### **if文**
```go
if condition {
    // 条件が真の場合の処理
} else {
    // 条件が偽の場合の処理
}
```

```go
if x := 10; x > 5 { // 初期化文を含めることが可能
    fmt.Println("x is greater than 5")
}
```

### **forループ**
Goでは唯一のループ構文として`for`を使用します。

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// 範囲ループ
nums := []int{1, 2, 3}
for index, value := range nums {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}
```

### **switch文**
```go
switch day := "Monday"; day {
case "Monday":
    fmt.Println("Start of the week")
case "Friday":
    fmt.Println("End of the week")
default:
    fmt.Println("Midweek")
}
```

---

## **4. 関数**
### **基本的な関数**
```go
func add(x int, y int) int {
    return x + y
}

result := add(3, 5)
fmt.Println(result)
```

### **複数の戻り値**
```go
func divide(a int, b int) (int, int) {
    return a / b, a % b
}

quotient, remainder := divide(10, 3)
fmt.Println(quotient, remainder)
```

### **無名関数**
```go
sum := func(a int, b int) int {
    return a + b
}
fmt.Println(sum(3, 7))
```

---

## **5. ポインタ**
Goではポインタを扱いますが、ポインタ演算はサポートされていません。

```go
var x int = 10
var p *int = &x // ポインタ
fmt.Println(*p) // ポインタを介して値を取得
```

---

## **6. 構造体とメソッド**
### **構造体の定義**
```go
type Person struct {
    Name string
    Age  int
}

p := Person{Name: "Alice", Age: 25}
fmt.Println(p.Name, p.Age)
```

### **メソッド**
```go
func (p Person) Greet() {
    fmt.Printf("Hello, my name is %s\n", p.Name)
}

p := Person{Name: "Alice", Age: 25}
p.Greet()
```

---

## **7. <ruby>エラー<rt>error</rt>ハンドリング<rt>handling</rt></ruby>**
Goではエラーを明示的に処理します。

```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }
}
```

---

## **8. ゴルーチンとチャネル**
### **<ruby>ゴルーチン<rt>goroutine</rt></ruby>**
軽量な<ruby>スレッド<rt>thread</rt></ruby>のようなものです。

```go
go func() {
    fmt.Println("This runs concurrently")
}()
```

### **チャネル**
ゴルーチン間の通信に使用します。

```go
ch := make(chan int)
go func() {
    ch <- 42
}()
value := <-ch
fmt.Println(value)
```

---

これらがGo言語の基礎文法の概要です。Goは簡潔で効率的なコードを書くための構造を提供していますので、ぜひ実際に試してみてください！