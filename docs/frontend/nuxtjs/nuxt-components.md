---
id: nuxt-components
sidebar_position: 3
---

# Nuxtコンポーネント徹底解説

## 1. コンポーネントとは？
Vue.jsやNuxt.jsにおける「コンポーネント」とは、UIを構成する再利用可能な部品（パーツ）のことです。ボタンやヘッダー、カード、リストなど、画面を構成するあらゆる要素をコンポーネントとして切り出して管理できます。

---

## 2. Nuxtのコンポーネント自動インポート
Nuxt 2.13以降（Nuxt 3も同様）、`components/` ディレクトリに配置したVueコンポーネントは自動的にインポートされ、明示的なimport文なしでテンプレート内で利用できます。

### 例
```
components/
  ├─ BaseButton.vue
  └─ Card.vue
```
これらはどのページや他のコンポーネントからも `<BaseButton />` や `<Card />` として直接使えます。

---

## 3. ディレクトリ構成と命名規則
- `components/` 配下にVueファイルを置くことで自動認識
- サブディレクトリもOK（例：`components/ui/Button.vue` → `<UiButton />`）
- ファイル名はパスカルケース（`MyComponent.vue`）推奨

---

## 4. グローバル・ローカルコンポーネント
- **グローバル**：自動インポート機能で全体から利用可能
- **ローカル**：`import`して`components`オプションで登録した場合、そのファイル内のみ利用可能

---

## 5. スロット・Props・Emit
- **Props**：親→子へデータを渡す
- **Emit**：子→親へイベント通知
- **Slot**：親から子へ任意のHTMLやコンポーネントを挿入

### 例
```vue
<template>
  <button @click="$emit('click')">
    <slot>デフォルトボタン</slot>
  </button>
</template>
<script setup>
defineProps(['type'])
</script>
```

---

## 6. 上級テクニック
- **動的インポート**：`<component :is="componentName" />` で動的に切り替え
- **カスタムディレクティブ**や**プラグイン**との連携
- **再帰コンポーネント**：自分自身を呼び出す（ツリー構造など）
- **コンポジションAPI**：`script setup`や`useXXX`でロジックを分離

---

## 7. Nuxt 3の新機能
- `components/`以外のディレクトリも自動インポート対象に追加可能（`nuxt.config.ts`で設定）
- TypeScriptサポートが強化
- `<script setup>`の推奨

---

## 8. 参考リンク
- [Nuxt 3公式ドキュメント：Components](https://nuxt.com/docs/guide/directory-structure/components)
- [Vue公式：コンポーネントの基本](https://ja.vuejs.org/guide/essentials/component-basics.html)

---

Nuxtのコンポーネント機能を活用することで、保守性・再利用性の高いUI開発が可能になります。
