---
id: git-squash-commit
sidebar_position: 12
---

# コミットをまとめる（squashする）手順の詳細な説明

以下は、コミットをまとめる（squashする）手順の詳細な説明です。特に初めて操作を行う場合に役立つよう、各ステップを詳しく解説します。

---

### 1. **プライベート（ローカル）のmainブランチを最新化**
まず、ローカルのmainブランチをリモートリポジトリと同期させます。

```bash
git checkout main
git pull
```

- **git checkout main**: ローカルの`main`ブランチに切り替えます。
- **git pull**: リモートリポジトリの最新状態をローカルに反映します。これにより、`main`ブランチが最新状態になります。

---

### 2. **作業中のtopicブランチに移動**
次に、作業中の`topic`ブランチに切り替えます。

```bash
git checkout ${topic}
```

- `${topic}` は作業ブランチの名前に置き換えてください。
- **例**: 作業ブランチが`feature/update-ui`の場合は以下のようにします：

```bash
  git checkout feature/update-ui
```

---

### 3. **topicブランチのコミットを一つにまとめる**
ここで、`git rebase -i`を使用してコミットをまとめます。

```bash
git rebase -i HEAD~${コミット数}
```

**`HEAD~${コミット数}`**: この指定により、直近のコミット履歴を指定します。
  **例**: コミット数が4つの場合：

  ```bash
  git rebase -i HEAD~4
  ```
  これにより、最新の4つのコミットを対象に`rebase`を行います。

#### vimが開いたら以下の手順を実行します：
1. **1行目のコミットはそのまま`pick`のままにする**
   これは、このコミットが「基準」になるためです。
2. **2行目以降の`pick`を`s`に変更**
   `s`（squash）は、現在のコミットを1つ上のコミットにまとめる動作を指定します。
   
    **例:**
    ```
    pick abc123 Initial commit
    pick def456 Add new feature
    pick ghi789 Fix bug
    pick jkl012 Update README
    ```

    以下のように変更します：
    ```
    pick abc123 Initial commit
    s def456 Add new feature
    s ghi789 Fix bug
    s jkl012 Update README
    ```

3. **変更を保存**
   `:wq` と入力して保存してvimを終了します。

---

### 4. **mainブランチにrebaseする**
次に、`topic`ブランチの変更を`main`ブランチに基づいて更新します。

```bash
git rebase main
```

この操作により、`main`ブランチの最新の変更を取り込みます。
**注意**: コンフリクトが発生した場合、適切に解消してから以下のコマンドを実行してください：
  ```bash
  git rebase --continue
  ```

---

### 5. **コミット履歴を確認**
変更が正しく反映されたか確認します。

```bash
git log -2
```

最新のコミット2つを確認します。これにより、直近のコミットが1つにまとめられたことを確認できます。

---

### 6. **強制プッシュ（force push）**
最後に、リモートリポジトリに変更を反映します。

```bash
git push -f origin ${topic}
```

**注意**: `-f`（force push）はリモートリポジトリの履歴を上書きする操作のため、使用には慎重を期してください。

---

### コミットまとめのポイント
- **コミットログの簡潔さ**: PR（Pull Request）が分かりやすくなります。
- **force pushの注意点**: 他の開発者が同じブランチを使用している場合、履歴の不一致を引き起こす可能性があります。そのため、事前にチームメンバーに通知するのがベストです。
