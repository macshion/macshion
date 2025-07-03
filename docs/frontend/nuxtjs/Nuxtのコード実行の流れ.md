---
id: ho-to-run
sidebar_position: 2
---

# Nuxtのコード実行の流れと実行環境の判定方法

## 1. Nuxtのコード実行の流れ（概要）

Nuxt.js（特にSSRやSSGモード）では、アプリケーションのコードが「サーバー側」と「クライアント側」の両方で実行されることがあります。

- **サーバー側（Server Side）**：初回リクエスト時にHTMLを生成するために実行される。
- **クライアント側（Client Side）**：ブラウザ上で動作し、ページ遷移やインタラクションを担当。

## 2. どのコードがどちらで実行されるかの判断基準

### サーバー側で実行される主なコード
- `asyncData`（Nuxt 2）/ `useAsyncData`（Nuxt 3）
- `fetch`（Nuxt 2）
- ページ初回表示時のAPIリクエスト
- サーバーAPI（`server/api/` ディレクトリ内）
- サーバーミドルウェア

### クライアント側で実行される主なコード
- Vueのライフサイクルフック（`mounted`、`beforeMount` など）
- DOM操作やブラウザAPIを使う処理
- ページ遷移後のインタラクション
- クライアント専用プラグイン

### 両方で実行される可能性があるコード
- `setup`関数（初回はサーバー、以降はクライアント）
- `useFetch`（初回SSR時はサーバー、クライアント遷移時はクライアント）

## 3. 実行環境の判定方法

Nuxtでは、実行環境（サーバー or クライアント）を判定するためのユーティリティが用意されています。

### Nuxt 3の場合
```js
import { useNuxtApp } from 'nuxt/app'
const nuxtApp = useNuxtApp()
if (nuxtApp.ssr) {
  // サーバー側で実行中
} else {
  // クライアント側で実行中
}
```

または、`process.server` / `process.client` も利用可能：
```js
if (process.server) {
  // サーバー側
}
if (process.client) {
  // クライアント側
}
```

### Nuxt 2の場合
```js
if (process.server) {
  // サーバー側
}
if (process.client) {
  // クライアント側
}
```

## 4. 実行順序のイメージ（SSRの場合）

1. サーバー側で`asyncData`や`fetch`、`setup`が実行され、HTMLが生成される
2. クライアントにHTMLが送信され、ハイドレーション（Vueの再活性化）が行われる
3. クライアント側で`mounted`や`created`などのライフサイクルフックが実行される
4. 以降のページ遷移やインタラクションはクライアント側で処理

---

## まとめ
- サーバー側：初回描画やAPI、サーバーミドルウェア
- クライアント側：DOM操作、ユーザー操作、ページ遷移
- `process.server`や`process.client`で判定可能
- 実行順序を意識してコードを書くことで、意図しないバグやパフォーマンス問題を防げます
