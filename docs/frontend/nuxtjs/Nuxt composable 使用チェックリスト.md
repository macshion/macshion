---
id: nuxt-composable-checklist
title: Nuxt composable 使用チェックリスト
description: Nuxt 3 / Nitro での composable 使用に関する安全なガイドラインとチェックリストです。
sidebar_position: 20
---

# Nuxt 3 / Nitro における安全な composable（`useXxx`）の使用チェックリスト
## 🔷 基本ルール：composable を使っていい場所か？

| ✔ チェック項目                                       | 説明                                             |
| ---------------------------------------------- | ---------------------------------------------- |
| ✅ `setup()` の中で使っているか？                         | Vue コンポーネント内部であれば安全です。                         |
| ✅ `defineNuxtRouteMiddleware()` の中で使っているか？     | middleware 内は context があるので OK。                |
| ✅ `defineNuxtPlugin()` の中で使っているか？              | plugin も安全に context が渡されるため OK。                |
| ✅ `defineEventHandler()`（API handler）内で使っているか？ | server/api/\*\* 内の composable は handler 関数内限定。 |

---

## 🔶 NGパターン：エラーが出やすい使い方

| ❌ パターン                                                            | 原因と対策                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| ❌ composable を **グローバルスコープ** で呼び出している                             | 例：`useRuntimeConfig()` をファイル先頭で実行 → ✘<br/>✅ 対策：関数内部で呼び出すようにする。       |
| ❌ `async function` の中で `await` の後に composable を呼んでいる              | `await` により context が切れることがある。<br/>✅ 対策：`runWithContext()` で包む。      |
| ❌ plugin 外で `useCookie`, `useRoute`, `useNuxtApp` を utils から呼んでいる | composable を util 関数に直接書くのは NG。<br/>✅ 対策：`composables/` に分離し、使用側で呼ぶ。 |

---

## 🔵 runWithContext の活用チェック

| ✔ チェック項目                                                     | 説明                                                          |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| ✅ `async` 関数内で composable を呼ぶ場合は `runWithContext()` を使っているか？ | `useNuxtApp().runWithContext(() => { useRoute() })` のように包む。 |
| ✅ 複数の `await` を含む処理では、composable の呼び出しを可能な限り最初に行っているか？       | 途中で context が切れないようにするため。                                   |

---

## 🟢 実装上のベストプラクティス

| 🌟 おすすめ習慣                                                        | 理由                          |
| ---------------------------------------------------------------- | --------------------------- |
| composable は `useAuth()`, `useUser()`, `useConfig()` のように責務単位で分割 | 可読性・責任の明確化                  |
| `useXXX` は同期関数にし、非同期処理は `initXXX()` を別で定義                        | composable 内で `await` を避ける  |
| composable の内部で `useNuxtApp()` を使うときは、常に context 内で呼ぶ            | instance unavailable を確実に防ぐ |
| SSR環境下で cookie, route 等を読む処理は「できるだけ遅延評価 or 明示的トリガーで実行」           | server context の読み取り失敗を防ぐ   |

---

## 📌 よく使う composable の注意点リスト

| composable                    | 使用上の注意                                                     |
| ----------------------------- | ---------------------------------------------------------- |
| `useNuxtApp()`                | `setup()`・middleware・plugin でのみ安全                          |
| `useCookie()` / `setCookie()` | API handler 内では `defineEventHandler` 内部でのみ使用可能             |
| `useRoute()` / `useRouter()`  | setup/middleware/plugin 内でのみ使用。非同期処理の中では runWithContext 推奨 |
| `useRuntimeConfig()`          | グローバル util では使用禁止。composable または plugin でラップする             |

---

## 📁 フォルダ別ガイドライン

| フォルダ           | OK な使い方                                    | NG な使い方                     |
| -------------- | ------------------------------------------ | --------------------------- |
| `composables/` | 同期関数 + composable 利用可                      | async/await 入れない（init関数を分離） |
| `utils/`       | 純粋なロジック処理                                  | composable 使用 ❌             |
| `plugins/`     | `defineNuxtPlugin()` 内で `useXXX()` 使用可     | 外で使うと NG                    |
| `middleware/`  | context 安全（OK）                             | ただし内部で await 多用時は注意         |
| `server/api/`  | `defineEventHandler()` 内で `useCookie` 等 OK | handler 外は NG               |
