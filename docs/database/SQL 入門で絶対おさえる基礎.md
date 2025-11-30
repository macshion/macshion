---
slug: sql-basics
title: SQL 入門で絶対おさえる基礎
tags: 
    - database
    - SQL
---

## ✅ **SQL 入門で絶対おさえる基礎**

SQL（Structured Query Language）は、リレーショナルデータベースを操作するための言語です。初心者が最初に押さえておくべき基本的な概念とコマンドをまとめました。

MySQL、PostgreSQL、SQLiteなど、主要なリレーショナルデータベースで共通して使われる基本的なSQL文法と概念を紹介します。

Mysqlを例に説明しますが、他のDBでもほぼ同じです。
Mysqlのダンロードはこちら：
https://dev.mysql.com/downloads/mysql/

MySQLのインストール方法：
https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/


MysqlWorkbenchのインストールもおすすめします。GUIで操作できるので初心者に優しいです。
ダウンロードはこちら：
https://dev.mysql.com/downloads/workbench/


インストールが完了でしたら、コンソールまたはWorkbenchで（ローカル）MySQLサーバーに接続してください。

接続情報（ホスト、ユーザー名、パスワード）はインストール時に設定したものを使用します。

通常は以下のように接続します：

```bash
mysql -u your_username -p
```

では、次に進みましょう！

## ■ **テーブルの概念**

* データは「表（table）」で管理
* 行（row）＝1件のデータ
* 列（column）＝データ項目（名前、年齢、メールなど）

👉 **まずはこれを"Excelの表っぽいイメージ"でOK**

```sql
# database と table 確認コマンド
SHOW DATABASES;
SHOW TABLES;

# database 選択コマンド
USE your_database_name;
SHOW TABLES;
```

---

## ■ **基本文（CRUD）**

SQLはだいたいこの4つで回ってる：

| 操作 | SQL      | 意味     |
| -- | -------- | ------ |
| 取得 | `SELECT` | データ読む  |
| 追加 | `INSERT` | データ入れる |
| 更新 | `UPDATE` | データ変える |
| 削除 | `DELETE` | データ消す  |

例👇

```sql
SELECT name, age FROM users WHERE age > 18;
```

ちょっとかっこよく言うと**データ操作の四天王**✨

---

## ■ **WHERE が命**

欲しいデータだけ抜くフィルタ

```
WHERE 条件
```

例：

```sql
SELECT * FROM products WHERE price <= 1000;
```

> **WHERE を制する者は SQL を制す**

---

## ■ **主キー（Primary Key）**

* レコードを一意に特定するID
* `id`とかをPKにするのが鉄板

```
id, email とか「ぜったいかぶらないもの」
```

---

## ■ **NULL と = のちがい**

SQLの落とし穴🕳️✨

| 条件        | 意味       |
| --------- | -------- |
| `= value` | 値が一致     |
| `IS NULL` | NULLかどうか |

NG例👇

```sql
WHERE name = NULL   -- ダメ
```

正解👇

```sql
WHERE name IS NULL
```

---

## ■ **JOIN（テーブル結合）**

* 別の表をつなぐ
* 本質：**「IDで仲良くなる」**

例：

```sql
SELECT u.name, o.total
FROM users u
JOIN orders o
ON u.id = o.user_id;
```

> JOIN わかると世界広がる😎🌍

---

## ■ **インデックス**

* 検索を高速化する仕組み
* 本でいう「索引」

```
"大量データ" ＋ "検索よくする列" → INDEX
```

---

## ■ **実践例：テーブル定義とサンプルデータ（MySQL）**

まずはテーブルを作ってサンプルデータを入れてみましょう。実際に動かすとイメージがつかみやすいです。

```sql
-- users テーブル作成
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- orders テーブル作成（ユーザーと紐付け）
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- サンプルデータ挿入
INSERT INTO users (name, email, age) VALUES
    ('佐藤 太郎', 'taro@example.com', 28),
    ('鈴木 花子', 'hanako@example.com', 34),
    ('田中 次郎', 'jiro@example.com', NULL);

INSERT INTO orders (user_id, total, status) VALUES
    (1, 1200.00, 'paid'),
    (1, 450.50, 'pending'),
    (2, 3000.00, 'paid');
```

---

## ■ **よく使う実例クエリ**

- 単純な SELECT と条件指定

```sql
-- 20歳以上のユーザーの名前とメール
SELECT name, email FROM users WHERE age >= 20;
```

- ORDER BY / LIMIT

```sql
-- 年齢の若い順で上位2件
SELECT name, age FROM users ORDER BY age ASC LIMIT 2;
```

- GROUP BY と集計

```sql
-- ユーザーごとの注文合計
SELECT u.id, u.name, COUNT(o.id) AS order_count, SUM(o.total) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

- サブクエリの例

```sql
-- 最後に注文したユーザー（サブクエリで最新の注文日時を取得）
SELECT u.name, u.email
FROM users u
WHERE u.id = (
    SELECT o.user_id FROM orders o ORDER BY o.created_at DESC LIMIT 1
);
```

- EXPLAIN を使った簡単な確認（インデックスやフルスキャンの確認）

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 1;
```

---

## ■ **練習問題（初心者向け）**

以下は手を動かして確認すると学びが深まります。答えは下にあります。

1) 全てのユーザーのうち、年齢が NULL のユーザーを取得するクエリを書いてください。

2) `orders` テーブルから合計が 1000 を超える注文だけを取得するクエリを書いてください。

3) ユーザーごとに支払済み（status = 'paid'）の注文件数を出し、件数の多い順に並べるクエリを書いてください。

---

## ■ **練習問題 — 解答例**

1)

```sql
SELECT * FROM users WHERE age IS NULL;
```

2)

```sql
SELECT * FROM orders WHERE total > 1000;
```

3)

```sql
SELECT u.id, u.name, COUNT(o.id) AS paid_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'paid'
GROUP BY u.id, u.name
ORDER BY paid_count DESC;
```

---

## ■ **MySQL向けのちょっとした注意点**

- 日付関係のデフォルト値（`CURRENT_TIMESTAMP`）は MySQL では便利ですが、使うバージョンや設定で挙動が異なる場合があります。
- `LIMIT` や `AUTO_INCREMENT` の使い方は方言依存の挙動があるため、他の DB（Postgres や SQLite）に移す場合は書き換えが必要です。
- 文字コード（utf8mb4）の設定は日本語を含む場面では重要です。テーブル作成時に `CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci` を検討してください。

---

## 🧠 最後に覚えておくと強いセリフ

* SQLは「データに質問する言語」
* SELECTは「欲しいものだけ、正確に言う」
* WHEREは「条件がすべて」
* PKは「データ世界の身分証」
* 案外、**基礎が一番むずいけど一番大事**
* 実際に手を動かして慣れるのが一番の近道！