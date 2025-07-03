---
id: nuxt-eslint
sidebar_position: 19
---

# Nuxt.js の ESLint 設定

## extends

| **Extends 設定**                             | **役割**                                                              | **必要なインストールコマンド**                                                      |
| -------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `"eslint:recommended"`                       | 標準的な JavaScript の Lint ルールセット                              | `npm install --save-dev eslint`                                                     |
| `"plugin:vue/vue3-recommended"`              | Vue 3 の Lint ルールセット (`Composition API` や `script setup` 対応) | `npm install --save-dev eslint-plugin-vue`                                          |
| `"plugin:nuxt/recommended"`                  | Nuxt.js 用の推奨 Lint ルールセット                                    | `npm install --save-dev eslint-plugin-nuxt`                                         |
| `"plugin:@typescript-eslint/recommended"`    | TypeScript 向けの Lint ルールセット                                   | `npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser` |
| `"plugin:prettier/recommended"`              | ESLint と Prettier の競合を防ぎ、コードフォーマットを統一             | `npm install --save-dev eslint-plugin-prettier prettier`                            |
| `"plugin:import/errors"`                     | `import` 文のエラー検出                                               | `npm install --save-dev eslint-plugin-import`                                       |
| `"plugin:import/warnings"`                   | `import` 文の警告検出                                                 | `npm install --save-dev eslint-plugin-import`                                       |
| `"plugin:unicorn/recommended"`               | 便利な JavaScript のベストプラクティスルールセット                    | `npm install --save-dev eslint-plugin-unicorn`                                      |
| `"plugin:simple-import-sort/recommended"`    | `import` の並び順を統一                                               | `npm install --save-dev eslint-plugin-simple-import-sort`                           |
| `"plugin:security/recommended"`              | セキュリティリスクのあるコードを警告                                  | `npm install --save-dev eslint-plugin-security`                                     |
| `"plugin:vue-scoped-css/recommended"`        | `<style scoped>` の適切な使用をチェック                               | `npm install --save-dev eslint-plugin-vue-scoped-css`                               |
| `"plugin:eslint-comments/recommended"`       | `eslint-disable` などのコメントの誤用を防ぐ                           | `npm install --save-dev eslint-plugin-eslint-comments`                              |
| `"plugin:perfectionist/recommended-natural"` | `import` や オブジェクトキーの並び順を統一                            | `npm install --save-dev eslint-plugin-perfectionist`                                |

ESLint と Prettier を統合して Nuxt.js + Vue の開発環境で使用する場合、以下の設定がおすすめです。

✅ **ESLint の設定 (`extends`, `plugins`) に追加するプラグインはすべて `npm install` が必要**  
✅ **`eslint:recommended` など ESLint 標準ルールは追加インストール不要**  
✅ **`eslint-plugin-xxx` の形式のものはインストールが必須**

```json
extends: [
'@nuxtjs', // Nuxt.js の公式ESLint設定
'@nuxtjs/eslint-config-typescript', // TypeScriptを使用したNuxt.jsプロジェクト向けのESLint設定
'plugin:prettier/recommended', // PrettierとESLintの競合を解消
'plugin:nuxt/recommended', // Nuxt固有のAPIのルールを適用
'plugin:import/errors', // モジュールのインポートエラーを検出
'plugin:import/warnings', // 使われていない import の警告
'eslint:recommended', // ESLintの基本的な推奨設定。例: no-unused-vars（未使用変数の警告）、no-console（本番環境での console.log の警告）など
'plugin:vue/vue3-recommended' // Vue 3向けのESLintの推奨設定
],
```

インストール

```bash
# yarnを使う
yarn add -D eslint \
  @nuxtjs/eslint-config \
  @nuxtjs/eslint-config-typescript \
  eslint-plugin-nuxt \
  eslint-plugin-vue \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-prettier prettier \
  eslint-plugin-import
```

これらの `extends` 設定を使用するために必要なパッケージを **`yarn`** でインストールするコマンドは以下の通りです：

```sh
yarn add -D eslint \
  @nuxtjs/eslint-config \
  @nuxtjs/eslint-config-typescript \
  eslint-plugin-nuxt \
  eslint-plugin-vue \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-prettier prettier \
  eslint-plugin-import
```

---

### **📌 コマンドの内訳**

| パッケージ                         | 理由                                                      |
| ---------------------------------- | --------------------------------------------------------- |
| `eslint`                           | ESLint の基本パッケージ                                   |
| `@nuxtjs/eslint-config`            | `@nuxtjs` の設定を適用するため                            |
| `@nuxtjs/eslint-config-typescript` | TypeScript 向けの Nuxt.js Lint ルール                     |
| `eslint-plugin-nuxt`               | `plugin:nuxt/recommended` のため                          |
| `eslint-plugin-vue`                | `plugin:vue/vue3-recommended` のため                      |
| `@typescript-eslint/eslint-plugin` | `plugin:@typescript-eslint/recommended` のため            |
| `@typescript-eslint/parser`        | TypeScript コードのパース用                               |
| `eslint-plugin-prettier`           | `plugin:prettier/recommended` のため                      |
| `prettier`                         | コードフォーマットのため                                  |
| `eslint-plugin-import`             | `plugin:import/errors` や `plugin:import/warnings` のため |

上記のコマンドをプロジェクトのルートディレクトリで実行すれば、`extends` で指定した ESLint 設定がすべて適用されます！✨

### 1. **`.eslintrc.js`**

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "prettier", "nuxt"],
  rules: {
    "prettier/prettier": ["error", { singleQuote: true, semi: false }],
    "vue/multi-word-component-names": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
```

### 2. **`.prettierrc`**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100
}
```

### 3. **`.eslintignore`**

```plaintext
node_modules/
dist/
.nuxt/
*.min.js
```

### 4. **`package.json` の `scripts`**

```json
"scripts": {
  "lint": "eslint --ext .js,.vue .",
  "lint:fix": "eslint --ext .js,.vue --fix ."
}
```

### **ポイント**

- `plugin:vue/vue3-recommended` を使って Vue 3 の推奨設定を適用
- `plugin:nuxt/recommended` で Nuxt.js の推奨ルールを適用
- `plugin:prettier/recommended` で ESLint と Prettier の競合を解消
- `prettier/prettier` ルールを適用してコードフォーマットを統一
- `.eslintignore` で不要なフォルダを除外
- `npm run lint` でコードチェック、`npm run lint:fix` で自動修正可能

この設定で、Nuxt.js + Vue 3 環境のコード品質を保ちつつ、Prettier によるフォーマットも適用されるので開発がスムーズになります！
