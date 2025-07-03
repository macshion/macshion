---
id: mermaid-usage
---

# Mermaid 利用ガイド

## 概要

Mermaid はテキストベースの図表生成ツールで、以下のようなさまざまな図をサポートしています：

* **フローチャート（Flowchart）**
* **シーケンス図（Sequence Diagram）**
* **ガントチャート（Gantt Chart）**
* **クラス図（Class Diagram）**
* **状態遷移図（State Diagram）**
* **ER図（Entity Relationship Diagram）**
* **ユーザージャーニー（User Journey）**
* **Gitグラフ（Git Graph）**

## 基本構文

Markdownファイル内で以下のような構文を使ってMermaidの図を作成します：

````markdown
```mermaid
graph TD
    A[開始] --> B[終了]
```
````

## フローチャート（Flowchart）

### 基本構文

```mermaid
graph TD
    A[開始] --> B{判断}
    B -->|はい| C[実行]
    B -->|いいえ| D[スキップ]
    C --> E[終了]
    D --> E
```

### ノードの形状

* `[]` - 長方形
* `()` - 角丸長方形
* `{}` - 菱形（条件分岐）
* `(())` - 円形
* `[[]]` - サブプロセス
* `{{}}` - 円柱形

### 接続線スタイル

* `-->` - 実線矢印
* `---` - 実線
* `-.->` - 破線矢印
* `-.` - 破線
* `==>` - 太い矢印
* `===` - 太い線

### 例

```mermaid
graph LR
    A[長方形] --> B(角丸長方形)
    B --> C{菱形}
    C -->|はい| D((円形))
    C -->|いいえ| E[サブプロセス]
    E --> F{{円柱}}
```

## シーケンス図（Sequence Diagram）

```mermaid
sequenceDiagram
    participant ユーザー
    participant フロントエンド
    participant バックエンド
    participant データベース
    
    ユーザー->>フロントエンド: リクエスト送信
    フロントエンド->>バックエンド: API呼び出し
    バックエンド->>データベース: データ照会
    データベース-->>バックエンド: 結果返却
    バックエンド-->>フロントエンド: レスポンス返却
    フロントエンド-->>ユーザー: 結果表示
```

## ガントチャート（Gantt Chart）

```mermaid
gantt
    title プロジェクト計画
    dateFormat  YYYY-MM-DD
    section フェーズ1
    タスク1    :done, task1, 2024-01-01, 2024-01-15
    タスク2    :active, task2, 2024-01-16, 2024-01-30
    section フェーズ2
    タスク3    :task3, 2024-02-01, 2024-02-15
```

## クラス図（Class Diagram）

```mermaid
classDiagram
    class 動物 {
        +String 名前
        +int 年齢
        +鳴く()
    }
    
    class 犬 {
        +String 犬種
        +吠える()
    }
    
    class 猫 {
        +String 毛色
        +鳴く()
    }
    
    動物 <|-- 犬
    動物 <|-- 猫
```

## 状態遷移図（State Diagram）

```mermaid
stateDiagram-v2
    [*] --> 未処理
    未処理 --> 処理中: 処理開始
    処理中 --> 完了: 完了
    処理中 --> 未処理: 再割り当て
    完了 --> [*]
```

## Docusaurusでの使用方法

1. **図の作成**：Markdownファイル内で \`\`\`\`mermaid\` コードブロックを使用
2. **構文強調**：コードブロックを `mermaid` と指定
3. **自動レンダリング**：図は自動的に描画され表示されます

## ベストプラクティス

1. **簡潔さを保つ**：複雑すぎる図を避ける
2. **わかりやすい名前を使う**：ノード名は意味が伝わるように
3. **適切なレイアウト方向を使う**：TD, LR, TB など
4. **色分けを活用**：ノードの種類ごとに色を使い分ける
5. **注釈を追加**：複雑な図には補足説明をつける

## よくある質問

### 図が表示されない

* コードブロックに `mermaid` が指定されているか確認
* 構文が正しいか確認
* ページをリロードしてみる

### スタイルの問題

* テーマ（ダーク/ライト）に自動適応
* CSSでスタイルをカスタマイズ可能

### パフォーマンスの問題

* 大規模な図はページの読み込み速度に影響する可能性あり
* 図を小さく分割することを検討

## 参考リンク

* [Mermaid公式サイト](https://mermaid.js.org/)
* [オンラインエディタ](https://mermaid.live/)
* [構文リファレンス](https://mermaid.js.org/syntax/flowchart.html)