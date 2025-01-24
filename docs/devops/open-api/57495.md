# @openapitools/openapi-generator-cli

**`@openapitools/openapi-generator-cli`** は、OpenAPI ツールの一つです。これは、OpenAPI 仕様に基づいてクライアント SDK、サーバースケルトン、ドキュメントなどを生成するための強力なコマンドラインツール **`OpenAPI Generator`** の公式 CLI（Command Line Interface）版です。

---

### **`@openapitools/openapi-generator-cli` の概要**

このツールは、Node.js 環境で利用可能なパッケージであり、OpenAPI Generator を簡単にインストールして使えるようにします。グローバルにインストールするか、プロジェクトに依存関係として追加して利用できます。

#### 主な用途

- クライアント SDK の生成（例：Java、TypeScript、Python など）
- サーバースケルトンコードの生成（例：Node.js、Spring など）
- OpenAPI ドキュメントの生成
- モックサーバーやスタブの生成

---

### **インストール方法**

#### 1. **グローバルインストール**

Node.js がインストールされている環境で以下のコマンドを実行します：

```bash
npm install -g @openapitools/openapi-generator-cli
```

#### 2. **プロジェクトの依存関係としてインストール**

プロジェクト内で使用したい場合：

```bash
npm install @openapitools/openapi-generator-cli --save-dev
```

---

### **主な使い方**

#### 1. **インストール済みバージョンの確認**

CLI が正しく動作しているか確認するには、以下を実行します：

```bash
openapi-generator-cli version
```

#### 2. **コードの生成**

OpenAPI 定義ファイル（例：`openapi.yaml`）を基にコードを生成するには、次のコマンドを実行します：

```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g <言語名> \
  -o <出力先ディレクトリ>
```

例：TypeScript のクライアントコードを生成する場合：

```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-axios \
  -o ./generated-client
```

#### 3. **利用可能なジェネレーターの一覧を確認**

どの言語やフレームワークに対応しているかを確認するには、次のコマンドを実行します：

```bash
openapi-generator-cli list
```

#### 4. **特定のジェネレーターの詳細を確認**

ジェネレーターごとの設定やオプションを確認するには：

```bash
openapi-generator-cli config-help -g <ジェネレーター名>
```

例：`typescript-axios`のオプションを確認する場合：

```bash
openapi-generator-cli config-help -g typescript-axios
```

---

### **特徴**

1. **多言語対応**
   - サーバー: Java（Spring Boot）、Python（Flask/Django）、Node.js（Express）など
   - クライアント: TypeScript、JavaScript、Python、Swift など
2. **柔軟なカスタマイズ**
   - 設定ファイル（`config.json`など）を作成して、生成されるコードを細かくカスタマイズ可能。
3. **更新が活発**
   - コミュニティ主導で開発されており、最新の仕様やツールへの対応が早い。

---

### **メリット**

- 手動でクライアントやサーバーのコードを書く手間を省ける。
- 一貫性のあるコードを自動生成できる。
- API の仕様変更に伴うコードの再生成が容易。

### **関連リンク**

- OpenAPI Generator 公式サイト: [https://openapi-generator.tech/](https://openapi-generator.tech/)
- npm パッケージページ: [https://www.npmjs.com/package/@openapitools/openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)
