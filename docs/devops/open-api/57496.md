# openapi-generator-cli の設定ファイルは必要なのか？

**`@openapitools/openapi-generator-cli`** を使用する場合、設定ファイルを用意することは、プロジェクト全体の一貫性を保ち、開発や運用で問題が発生するのを防ぐために重要です。

ただし、OpenAPI Generator CLI がデフォルトで探す設定ファイルはありません。そのため、コマンド実行時に明示的に設定ファイルを指定する必要があります。
ファイル名を自由に設定できますが、以下のような名前が推奨されることが多いです：

- openapi-generator-cli.json
- openapi-config.json

---

## 設定ファイルの例

openapi-config.json

```json
{
  "$schema": "./node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  "spaces": 1,
  "generator-cli": {
    "version": "6.0.1"
  }
}
```

---

## **設定が必要な理由**

### 1. **CLI のバージョンを固定するため**

OpenAPI Generator は頻繁に更新され、新機能やバグ修正が加わりますが、バージョン間で互換性が壊れることもあります。たとえば、特定のバージョンでは生成されたコードの構造が異なったり、API の認証設定が変わったりします。

- **問題例**:

  - 開発チーム A が OpenAPI Generator のバージョン「6.0.1」を使い、クライアント SDK を生成。
  - 後日、開発チーム B が同じプロジェクトでバージョン「6.2.0」を使った場合、生成されたコードに違いが生じ、動作が変わる可能性がある。

- **解決策**:
  設定ファイルにバージョンを指定（例: `6.0.1`）することで、すべてのチームや CI/CD 環境で同じバージョンを使用するよう強制できる。これにより、生成コードの一貫性を保ちます。

---

### 2. **設定の共有とチーム間の一貫性確保**

プロジェクトによっては、生成コードのスタイルや形式を統一する必要があります。この設定ファイルをリポジトリに保存しておくと、全員が同じ設定を自動的に使うようになります。

- **具体例**:

  - プロジェクト A では、生成コードのインデントを「2 スペース」に統一。
  - プロジェクト B では、コードレビューの方針により「4 スペース」を採用。

  → 設定ファイルでインデント幅（`spaces`）を明示的に指定することで、プロジェクトごとのコードスタイルが簡単に管理できます。

---

### 3. **エディターやツールでのスキーマバリデーション**

`$schema` を指定することで、この設定ファイルのフォーマットが適切かどうかをエディターがリアルタイムでチェックできるようになります。

- **利点**:
  - タイポや記述ミスを事前に防ぐ（例: `versions` と誤記した場合にエラーが出る）。
  - エディター（例: VS Code）で設定の補完機能が利用可能になる。

---

### 4. **自動化と効率化**

設定ファイルを利用することで、コマンドの簡略化や反復作業の効率化が図れます。

- **例**:
  通常、OpenAPI Generator CLI を使うときにコマンドラインで以下のように細かく指定する必要があります。

  ```bash
  openapi-generator-cli generate \
    -i openapi.yaml \
    -g typescript-axios \
    -o ./generated-client \
    --additional-properties=useSingleRequest=true
  ```

  しかし、設定ファイルにこれらを記載すれば、次のようにシンプルなコマンドで実行可能です：

  ```bash
  openapi-generator-cli generate
  ```

  **補足**: オプション（例: `--additional-properties`）も設定ファイルに書くことで、コマンドの記述ミスを防げます。

---

### 5. **CI/CD パイプラインでの安定性**

CI/CD 環境でコード生成を自動化する際にも、この設定が役立ちます。

- **問題例**:

  - CI/CD 環境で最新の OpenAPI Generator バージョンが使われ、生成されたコードがローカルでの動作と異なる。
  - この差異が原因で API クライアントがエラーを起こす。

- **解決策**:
  設定ファイルでバージョンを固定し、CI/CD パイプラインやローカル環境間で動作を一致させる。

---

## **設定ファイルが解決する主な問題のまとめ**

| 問題                             | 解決策                                             |
| -------------------------------- | -------------------------------------------------- |
| バージョン不一致による動作の差異 | 設定ファイルでバージョンを固定化                   |
| チーム間の設定のばらつき         | 設定ファイルを共有して統一                         |
| コマンドの冗長性                 | 設定ファイルに事前定義してシンプルな実行コマンド化 |
| 設定ミス                         | `$schema` によるバリデーションでミスを防ぐ         |

---

## **補足: 追加オプションの例**

この設定ファイルは拡張可能で、生成コードのプロパティを細かく設定することもできます。

#### 例: TypeScript-Axios の設定

```json
{
  "$schema": "./node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  "spaces": 2,
  "generator-cli": {
    "version": "6.0.1"
  },
  "typescript-axios": {
    "additional-properties": {
      "supportsES6": true,
      "useSingleRequest": true,
      "modelPropertyNaming": "camelCase"
    }
  }
}
```

- **`supportsES6`**: ES6 対応コードを生成。
- **`useSingleRequest`**: リクエストごとに関数を作成せず、1 つのエントリポイントに統合。
- **`modelPropertyNaming`**: モデルのプロパティ名を `camelCase` に変換。

## 複数設定ファイルの使い分け

プロジェクトごとに設定ファイルを用意することで、プロジェクトごとに異なる設定を適用できます。

```bash
# 開発環境用のクライアントコード生成
openapi-generator-cli generate \
  -i openapi-dev.yaml \
  -g typescript-axios \
  -o ./dev-client \
  -c openapi-config.dev.json

# 本番環境用のクライアントコード生成
openapi-generator-cli generate \
  -i openapi-prod.yaml \
  -g typescript-axios \
  -o ./prod-client \
  -c openapi-config.prod.json
```

以下のコマンドは、**OpenAPI Generator CLI** を使用して、開発環境用の TypeScript クライアントコードを生成するための実行例です。それぞれのオプションと役割について詳しく解説します。

### **コマンド解説**

#### 1. **`openapi-generator-cli`**

- これは、`@openapitools/openapi-generator-cli` ツールの実行コマンドです。
- このツールは、OpenAPI 仕様に基づいてサーバーやクライアントのコードを自動生成します。

#### 2. **`generate`**

- `generate` サブコマンドは、「コード生成」を実行するためのメインコマンドです。

---

#### 3. **`-i openapi-dev.yaml`**

- **`-i`** は **`--input-spec`** の省略形で、OpenAPI 仕様ファイル（YAML または JSON）を指定します。
- この例では、`openapi-dev.yaml` が使用されています。

**具体的な意味:**

- `openapi-dev.yaml` は開発環境用の API 仕様を定義したファイル。
- このファイルには以下のような情報が記述されています：
  - API エンドポイント（例: `/users`、`/orders` など）
  - HTTP メソッド（GET、POST、PUT、DELETE）
  - リクエストパラメータ、レスポンスフォーマット
  - 認証設定など

---

#### 4. **`-g typescript-axios`**

- **`-g`** は **`--generator-name`** の省略形で、どの言語やフレームワークのコードを生成するかを指定します。
- `typescript-axios` は、TypeScript で書かれた Axios（HTTP リクエストライブラリ）をベースとしたクライアントコードを生成します。

---

#### 5. **`-o ./dev-client`**

- **`-o`** は **`--output`** の省略形で、生成されたコードの出力先ディレクトリを指定します。
- この例では、`./dev-client` フォルダに生成物が出力されます。

**注意点:**

- 指定したフォルダが存在しない場合、自動的に作成されます。
- 既存のフォルダがある場合、既存のコードが上書きされるため、必要に応じてバックアップを取っておきましょう。

---

#### 6. **`-c openapi-config.dev.json`**

- **`-c`** は **`--config`** の省略形で、ジェネレーター用の設定ファイルを指定します。
- `openapi-config.dev.json` は、生成コードの詳細な挙動をカスタマイズするための JSON 形式の設定ファイルです。

### **設定ファイルでできること**

- クライアントコードのプロパティをカスタマイズ
- 型命名規則やフォーマットの変更
- 追加のプロパティ（`additional-properties`）を指定

**例: `openapi-config.dev.json` の中身**

```json
{
  "generator-cli": {
    "version": "6.0.1"
  },
  "typescript-axios": {
    "additional-properties": {
      "supportsES6": true,
      "withSeparateModelsAndApi": true,
      "modelPropertyNaming": "camelCase"
    }
  }
}
```

- **`supportsES6`**: ES6 モジュール形式でコードを生成。
- **`withSeparateModelsAndApi`**: モデルと API クラスを別々のファイルに生成。
- **`modelPropertyNaming`**: モデルのプロパティを `camelCase` に変換。

---

### **全体の動作フロー**

1. **入力ファイルを読み込む**: `openapi-dev.yaml` に記載された API 仕様を CLI が解析。
2. **コードを生成**: `typescript-axios` 用に最適化されたクライアントコードを生成。
3. **設定を適用**: `openapi-config.dev.json` に基づき、生成コードのスタイルや構造をカスタマイズ。
4. **出力先に保存**: 生成されたコードが `./dev-client` ディレクトリに保存される。

---

### **生成結果の例（`./dev-client`）**

出力先の `./dev-client` ディレクトリには、以下のような構造のコードが生成されることがあります。

```plaintext
./dev-client
├── apis/
│   ├── DefaultApi.ts      # APIのエンドポイント実装
│   └── index.ts           # APIエントリポイント
├── models/
│   ├── User.ts            # ユーザーモデル
│   └── Order.ts           # 注文モデル
├── index.ts               # エクスポート設定
└── README.md              # 使い方のドキュメント
```

---

### **コマンドの目的**

- **開発環境用クライアント生成**: 開発環境の API 仕様に基づき、フロントエンドや他のサービスが利用するためのクライアント SDK を作成する。
- **一貫性と効率性**: 手動でクライアントコードを記述せず、最新の API 仕様に基づくコードを自動生成することで、ミスを減らし開発効率を向上させる。

---

このように、設定ファイルをプロジェクトごとに用意することで、プロジェクトごとに異なる設定を適用できます。
