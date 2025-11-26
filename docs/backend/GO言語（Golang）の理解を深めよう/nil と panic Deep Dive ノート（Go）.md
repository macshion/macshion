---
title: "nil と panic Deep Dive ノート（Go）"
slug: nil-and-panic-deep-dive-note-go
---

# nil と panic Deep Dive ノート（Go）

## 1. nil とは何か

* **「参照先がない」ことを表すゼロ値**。
* 使える型は「参照系」だけ：`*T`（ポインタ）、`[]T`（スライス）、`map[K]V`、`chan T`、`func`、`interface`。
* スカラー（`int`, `bool`, `struct` など）には `nil` は存在しない。

### 代表的な nil の意味

* 「見つからなかった／まだ用意していない」（DB検索・キャッシュ未命中）
* 「オプショナル値」（値が存在しないかもしれない設定項目）
* 「未初期化の参照」（作ってない map, chan, slice, func）

---

## 2. 型別 nil の挙動と落とし穴

### 2.1 ポインタ `*T`

* `var p *User = nil` は合法。**デリファレンス `*p` や `p.Field` で panic**。
* メソッド呼び出しは**レシーバ側が nil を受け入れる実装なら可**（レアだが可能）。

```go
type Box struct{ Val int }
func (b *Box) SafeGet() int {
    if b == nil { return 0 }
    return b.Val
}
```

### 2.2 スライス `[]T`

* `var s []int = nil` は**長さ0・容量0**のスライスとして扱われ、**range は安全**。
* `append` は nil スライスにも使える（場面により「nil」か「空」の使い分けが重要）。
* JSON や API で**nil vs 空配列 `[]` の表現差**が意味を持つことに注意。

```go
var s []int = nil
fmt.Println(len(s)) // 0（OK）
s = append(s, 1)    // OK
```

### 2.3 map

* `var m map[string]int = nil` は**読み取りは0値返すが、書き込みで panic**。
* 必ず `make(map[string]int)` で初期化してから代入。

```go
var m map[string]int // nil
_ = m["k"]           // 読み取りOK（0返す）
m["k"] = 1           // panic: assignment to entry in nil map
```

### 2.4 channel

* `var ch chan int = nil` は**送受信でブロック永久待ち**。`select` でのガードに使える。

```go
var ch chan int // nil
select {
case <-ch:      // 決して準備完了しない＝このcaseは決して選ばれない
default:
    fmt.Println("skip")
}
```

### 2.5 func

* `var f func() = nil` を**呼び出すと panic**。
* DI 等で関数を差し込む設計では nil ガード必須。

### 2.6 interface（超重要：**nilインターフェース問題**）

* `var w io.Writer = (*bytes.Buffer)(nil)` は**動的型あり・動的値 nil**。`w == nil` は **false**。
* **「型付きnil」**は `== nil` 判定をすり抜けるので要注意。

```go
var w io.Writer            // 真のnil（型も値もnil） → w == nil は true
var b *bytes.Buffer = nil
w = b                      // 型: *bytes.Buffer, 値: nil → w == nil は false
```

**対策**

* `if w == nil { ... }` は「真の nil」にしか効かない。
* 代入元で「nil は渡さない」か、「明示的な bool（ok）やエラーで状態を返す」など、契約を決める。

---

## 3. panic とは何か

* **実行時の異常を即座に停止させるメカニズム**。
* 代表例：**nil ポインタ参照、配列境界外、0除算、nil func 呼び出し、map 書き込み to nil**。
* アプリ全体を止める威力があるので、**通常のエラー処理には使わない**のが Go の流儀。

---

## 4. panic と error の使い分け（実務指針）

* **recover 不能なプログラミングミス**や**不変条件の破壊**には panic（例：不整合な初期化、絶対に起きないはずの分岐）。
* **外部要因や入力エラー**は `error` で返す（I/O, ネットワーク, バリデーション）。
* **ライブラリは panic を避け、error を返す**。アプリのエッジ（main/HTTPミドルウェア）で必要に応じて recover。

---

## 5. defer / panic / recover の連携

```go
func safeRun(fn func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            // r は interface{}（panicの引数）
            err = fmt.Errorf("panic recovered: %v", r)
        }
    }()
    fn()
    return nil
}
```

* `recover()` は**同じゴルーチンの panic** を **defer の中で**のみ捕捉可能。
* recover 後は**スタックを巻き戻した位置から続行**するが、状態は壊れている可能性がある。**復帰の可否は設計判断**。

---

## 6. よくある panic 原因と防ぎ方チェックリスト

1. **nil ポインタ参照**

   * ガード: `if x == nil { return }`
   * コンストラクタで必ず初期化 or 不変条件をコメントで明記

2. **nil map への書き込み**

   * 生成: `m := make(map[K]V)` を徹底

3. **スライス境界外アクセス**

   * ガード: `if i < 0 || i >= len(s) { ... }`

4. **nil func 呼び出し**

   * DI の初期化チェック、もしくはダミー関数で初期化

5. **型アサーション失敗**

   * `v, ok := x.(T)` で `ok` を必ず確認

6. **並行処理の close 済みチャネル送信**

   * 送信側は close しない、close は受信側のみなどルール化

---

## 7. エラーハンドリングと nil のデザインパターン

### 7.1 `(T, bool)` で存在有無を返す

```go
func Find(id int) (User, bool) {
    u, ok := db[id]
    return u, ok
}
```

* 存在しないことが**通常系**なら `bool` が明快。

### 7.2 `(*T, error)` で異常と共に返す

```go
func LoadUser(id int) (*User, error) {
    if !exists(id) {
        return nil, nil // 「見つからない」はエラーではない契約もあり
    }
    // または: return nil, ErrNotFound（方針次第）
}
```

* 「見つからない」を `nil, nil` にするか `ErrNotFound` にするかは**API契約を統一**する。

### 7.3 オプショナル値はポインタで表現

```go
type Config struct {
    Timeout *time.Duration // 省略時 nil
}
```

* 使う側でデフォルト補完：`if c.Timeout == nil { t = 30 * time.Second }`

---

## 8. nil と等価比較の注意（特に interface）

* **型付き nil** は `== nil` 比較で false。
* `fmt.Printf("%T %v\n", w, w)` で動的型・値を確認してデバッグ。

---

## 9. 実務のガイドライン（すぐ使える）

* **関数の入り口で nil ガード**して早期 return（ネストを浅く）
* **map/chan は make で初期化**。不変条件にするならコンストラクタ必須
* **スライス：nil と空の違い**をチームで統一（JSON表現、DB保存時）
* **ライブラリは panic しない**。アプリ境界で recover ミドルウェアを入れる
* **エラーは wrap** して文脈を残す（`fmt.Errorf("read %s: %w", path, err)`）
* **interface に nil を格納しない設計**（もしくは格納するなら契約とチェックを明示）

---

## 10. 例：HTTP サーバでの recover ミドルウェア

```go
func Recover(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                http.Error(w, "internal error", http.StatusInternalServerError)
                // ログに stack などを出す
            }
        }()
        next.ServeHTTP(w, r)
    })
}
```

* **アプリ境界で一括 recover**。ライブラリ層は error を返す。

---

## 11. 例：nil-safe なアクセサ

```go
type User struct {
    Name *string
}

func (u *User) GetNameOr(def string) string {
    if u == nil || u.Name == nil {
        return def
    }
    return *u.Name
}
```

* 呼び出し側の負担を下げる「nil 吸収」メソッドは現場でよく喜ばれる。

---

## 12. まとめ（運用の勘所）

* nil は「不在」の表現であり、**型ごとに意味と挙動が違う**。
* panic は**最終兵器**。**通常は error で返す**。
* interface の **型付き nil** による比較バグは王道ハマりポイント。まずここを避ける設計に。
* **早期ガード・不変条件・初期化の徹底**で大半の nil 起因バグは潰せる。
* 境界で **recover**、内部は **error**。責務分離が安定運用の鍵。
