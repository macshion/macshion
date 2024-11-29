---
title: Go言語の並行処理
description: Go言語の並行処理についてまとめました。
tags:
  - Go
---

## **ゴルーチン (Goroutines) について詳しく説明**

**ゴルーチン (Goroutines)** は、Go言語で並行処理を実現するための軽量スレッドのようなものです。Goは、スレッドよりも低コストで効率的な並行処理を提供するためにゴルーチンを用います。

---

## **1. ゴルーチンの基本**
ゴルーチンを使うと、関数を並行して実行できます。ゴルーチンは`go`キーワードを使って起動します。

### **基本構文**
```go
go 関数名(引数)
```

- ゴルーチンは並行して実行されるので、メインプログラムが終了するとゴルーチンも終了します。
- 並行処理を正しく調整するために、**チャネル (channels)** や **syncパッケージ**を使うことが一般的です。

### **基本例**
```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        fmt.Println(s)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go say("hello") // ゴルーチンとして実行
    say("world")    // メインスレッドで実行
}
```

**出力例**（順序は実行環境に依存）:
```
world
hello
world
hello
world
hello
world
hello
world
```

---

## **2. ゴルーチンの仕組み**
ゴルーチンはOSスレッドではなく、Goランタイムが管理するスケジューリングユニットです。

- **軽量**: 数千のゴルーチンを作成してもパフォーマンスに大きな影響を与えません。
- **スタックサイズ**: 初期スタックサイズは非常に小さく（数KB）、動的に拡張されます。

### **Goroutines vs Threads**
| 特徴            | ゴルーチン                | スレッド                  |
|-----------------|-------------------------|-------------------------|
| コスト          | 非常に低い               | 高い                    |
| コンテキスト切替 | 軽量                     | 比較的重い               |
| 数              | 多数作成可能（数千〜数百万）| 限られる（OS依存）       |
| 管理            | Goランタイムが管理        | OSが管理                |

---

## **3. ゴルーチン間の通信**
ゴルーチン間のデータ共有や同期には、Go言語独自の**チャネル (channel)** を使います。

### **チャネルの基本**
チャネルは、ゴルーチン間でデータをやり取りする安全な方法を提供します。

#### **チャネルの作成**
```go
ch := make(chan 型)
```

#### **送信と受信**
- **送信**: `ch <- value`
- **受信**: `value := <-ch`

### **チャネルの使用例**
```go
package main

import "fmt"

func sum(nums []int, ch chan int) {
    total := 0
    for _, num := range nums {
        total += num
    }
    ch <- total // チャネルに値を送信
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    ch := make(chan int)

    go sum(nums[:len(nums)/2], ch)
    go sum(nums[len(nums)/2:], ch)

    x, y := <-ch, <-ch // チャネルから値を受信
    fmt.Println("Total:", x+y)
}
```

---

## **4. バッファ付きチャネル**
**チャネル(channel)** は **バッファ(buffer)** を持つことができます。バッファ付きチャネルでは、送信はバッファが一杯になるまでブロックされず、受信はバッファが空になるまでブロックされません。

### **バッファ付きチャネルの作成**
```go
ch := make(chan int, 2) // バッファサイズ2
```

### **例**
```go
package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 1
    ch <- 2

    fmt.Println(<-ch)
    fmt.Println(<-ch)
}
```

---

## **5. セレクト (select) ステートメント**
複数のチャネルを待ち受ける場合、`select`ステートメントを使用します。

### **例**
```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "one"
    }()

    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "two"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("Received from ch1:", msg1)
        case msg2 := <-ch2:
            fmt.Println("Received from ch2:", msg2)
        }
    }
}
```

---

## **6. 注意点と課題**
### **競合状態**
複数のゴルーチンが同じメモリを操作する場合、競合状態が発生する可能性があります。

#### **例**
```go
package main

import (
    "fmt"
    "sync"
)

var counter int = 0

func increment(wg *sync.WaitGroup, mu *sync.Mutex) {
    mu.Lock()
    counter++
    mu.Unlock()
    wg.Done()
}

func main() {
    var wg sync.WaitGroup
    var mu sync.Mutex

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go increment(&wg, &mu)
    }

    wg.Wait()
    fmt.Println("Final Counter:", counter)
}
```

- **sync.Mutex**: 同期を取るためのミューテックス。
- **sync.WaitGroup**: ゴルーチンの終了を待機する。

---

## **まとめ**
- **ゴルーチン**は、軽量な並行処理を実現するための仕組みで、数千ものゴルーチンを効率的に管理可能です。
- **チャネル**を使うことで、ゴルーチン間のデータ共有や同期を安全に行えます。
- 複雑な並行処理には、**`sync`パッケージ**を用いた同期が必要になる場合があります。

Go言語の並行処理は、シンプルで効率的な設計となっており、高パフォーマンスなプログラムを構築するのに適しています。