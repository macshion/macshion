---
title: 競合状態と同期ツール `sync` パッケージ
description: Go言語の競合状態と同期ツール `sync` パッケージについてまとめました。
tags:
  - Go
---

**競合状態 (Race Condition)**　は、複数のゴルーチンが同じメモリ領域（変数やデータ構造など）を同時に操作し、その操作順序がプログラムの動作に影響を与える状態を指します。

---

##### **競合状態の例**
以下のコードでは、複数のゴルーチンが同じ変数 `counter` を同時に操作しています。

```go
package main

import (
    "fmt"
    "sync"
)

var counter = 0

func increment(wg *sync.WaitGroup) {
    for i := 0; i < 1000; i++ {
        counter++ // 競合状態発生の可能性
    }
    wg.Done()
}

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go increment(&wg)
    }

    wg.Wait()
    fmt.Println("Counter:", counter) // 正しい値にならない可能性
}
```

**問題点**:
- `counter++` の操作は非原子的 (atomic) であり、複数のゴルーチンが同時に実行すると不整合が生じます。
- 結果として、最終的なカウントが予期しない値になることがあります。

---

#### **`sync` パッケージの役割**

`sync` パッケージは、並行処理における同期を提供するためのツールを集めたものです。主に以下の2つが競合状態の防止に使われます。

---

##### **1. `sync.Mutex`**
ミューテックス（**Mut**ual **Ex**clusion）は、データへのアクセスを一度に1つのゴルーチンに制限する仕組みです。

###### **使用方法**
- **`Lock`**: 他のゴルーチンがデータにアクセスできないようにする。
- **`Unlock`**: 他のゴルーチンがアクセスできるようにする。

```go
package main

import (
    "fmt"
    "sync"
)

var counter = 0
var mu sync.Mutex // ミューテックスの宣言

func increment(wg *sync.WaitGroup) {
    for i := 0; i < 1000; i++ {
        mu.Lock() // ロック開始
        counter++
        mu.Unlock() // ロック解除
    }
    wg.Done()
}

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go increment(&wg)
    }

    wg.Wait()
    fmt.Println("Counter:", counter) // 正しい値になる
}
```

---

##### **2. `sync.WaitGroup`**
`sync.WaitGroup` は、複数のゴルーチンの終了を待機するための構造体です。

###### **使用方法**
- **`Add(n)`**: カウントを増やす。
- **`Done()`**: カウントを減らす。
- **`Wait()`**: カウントが0になるまでブロックする。

```go
package main

import (
    "fmt"
    "sync"
)

func printMessage(msg string, wg *sync.WaitGroup) {
    fmt.Println(msg)
    wg.Done() // 完了を通知
}

func main() {
    var wg sync.WaitGroup

    messages := []string{"Hello", "World", "Goroutines"}

    for _, msg := range messages {
        wg.Add(1) // ゴルーチンを追加
        go printMessage(msg, &wg)
    }

    wg.Wait() // すべてのゴルーチンが終了するのを待つ
    fmt.Println("All goroutines finished")
}
```

---

### **まとめ**

**競合状態**:
   - 複数のゴルーチンが同時に共有データを操作することで発生する問題。
   - 解決には同期ツールが必要。

**`sync` パッケージ**:
   - `sync.Mutex` を使用してデータの排他的制御を実現。
   - `sync.WaitGroup` を使用してゴルーチンの終了を待機。

Goの並行処理は強力ですが、競合状態を回避し、安全性を確保するためには適切な同期ツールの使用が不可欠です。

