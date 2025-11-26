---
title: "nil と panic をテーマにした理解チェック&深掘り用の質問カテゴリ.md"
slug: nil-and-panic-theme-understanding-check-deep-dive-questions-category
---

* Category 1: nil 基礎
* Category 2: 実務 nil
* Category 3: panic
* Category 4: recover
* Category 5: interface × nil（難所だけど価値大）
* Category 6: 実務シミュレーション

---

## ✅ **Category 1: nil の基本**

| No | 質問                                            |
| -- | --------------------------------------------- |
| 1  | Goで `nil` になりうる型は何？具体例は？                      |
| 2  | `var s []int = nil` と `s := []int{}` の違いは？    |
| 3  | `var m map[string]int`（nil map）には何ができて何ができない？ |
| 4  | `var p *User = nil` の状態で `p.Name` を呼ぶとどうなる？   |
| 5  | nil の「ゼロ値」と「未初期化」の違いは？                        |

---

## ✅ **Category 2: 実務 nil 判定**

| No | 質問                                             |
| -- | ---------------------------------------------- |
| 6  | `if x == nil {}` で検出できないケースとは？                 |
| 7  | Optional値を表現するとき、なぜポインタ使う？                     |
| 8  | DB検索で「見つからなかった」とき `nil` と `error` の使い分け例は？     |
| 9  | Struct内の `*time.Time` や `*int` が nil の場合、どう扱う？ |
| 10 | nilスライスをJSONにするとき、`null` と `[]` の違いは？          |

---

## ✅ **Category 3: panic の基本**

| No | 質問                        |
| -- | ------------------------- |
| 11 | panic が起きる典型パターンを5つ挙げて    |
| 12 | error と panic の使い分けは？     |
| 13 | panic が起きたとき Goの内部で何が起きる？ |
| 14 | panic を使うべき状況はどんなとき？      |
| 15 | map書き込みでpanicが起きる条件は？     |

---

## ✅ **Category 4: defer / recover**

| No | 質問                            |
| -- | ----------------------------- |
| 16 | recover が効く条件は？（場所・スコープ）      |
| 17 | recover した後の処理フローどうなる？        |
| 18 | HTTPサーバでpanicを止める仕組みどう作る？     |
| 19 | panic情報（stacktrace）をログに残す理由は？ |
| 20 | recover 乱用すると何が悪い？            |

---

## ✅ **Category 5: interface × nil（難所）**

| No | 質問                                       |
| -- | ---------------------------------------- |
| 21 | 「型付きnil」とは？                              |
| 22 | なぜ `w == nil` が false なのに内部は nil のことがある？ |
| 23 | interface に nil を入れるより良い代替設計は？           |
| 24 | `(interface, bool)` パターンの利点は？            |
| 25 | `error` も interface だけど nil問題は起こる？       |

---

## ✅ **Category 6: 実務シナリオ**

| No | 質問                                       |
| -- | ---------------------------------------- |
| 26 | APIレスポンスで null と [] の扱い方は？               |
| 27 | DBレイヤが `(*User, nil)` を返したとき、ハンドラ側でどう処理？ |
| 28 | nilが返る関数に対して防御的にどう書く？                    |
| 29 | `nil chan` を利用すると便利なパターンは？               |
| 30 | Config struct に Optional値があるときの安全な実装は？   |

---
