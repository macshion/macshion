---
id: git-multiple-github-accounts
sidebar_position: 78
---

# 1台のマシンで複数のGitHubアカウントを使用する方法

**1台のマシンで複数のGitHubアカウントを使用する方法**について解説しています。

---

### **概要**
GitHubアカウントが複数ある場合（例：仕事用と個人用）、1つのマシンでこれらのアカウントをスムーズに使い分けるための設定方法を5つのステップで説明しています。

この設定は、Macを前提としていますが、他の環境でも適用可能です。

---

### **ステップ1: 各アカウント用のSSHキーを生成する**
1. **.sshフォルダに移動**: 
   ```sh
   cd ~/.ssh
   ```
2. **SSHキーの生成コマンド**:
   ```sh
   ssh-keygen -t rsa -C "メールアドレス" -f "アカウント名"
   ```
   - `-C` はコメント（メールアドレス）。
   - `-f` はSSHキーの保存先ファイル名。

3. **例**:
   ```sh
   ssh-keygen -t rsa -C "my_office_email@gmail.com" -f "github-rahul-office"
   ssh-keygen -t rsa -C "my_personal_email@gmail.com" -f "github-rahul-personal"
   ```
   上記コマンドで公開鍵（`.pub`拡張子）と秘密鍵（拡張子なし）が生成されます。

---

### **ステップ2: SSHキーをSSHエージェントに追加する**
生成したSSHキーをSSHエージェントに登録します。
```sh
ssh-add -K ~/.ssh/github-rahul-office
ssh-add -K ~/.ssh/github-rahul-personal
```

---

### **ステップ3: 公開鍵をGitHubアカウントに追加する**
1. **公開鍵をコピー**:
   ```sh
   pbcopy < ~/.ssh/github-rahul-office.pub
   pbcopy < ~/.ssh/github-rahul-personal.pub
   ```
2. **GitHub設定に追加**:
   **GitHubにログイン**し、**Settings > SSH and GPG keys > New SSH Key** に進む。
   公開鍵を貼り付け、タイトルを設定。

---

### **ステップ4: Configファイルを作成しホストを設定する**
1. **Configファイル作成**:
   ```sh
   touch ~/.ssh/config
   open ~/.ssh/config
   ```
2. **内容を記述**:
   ```config
   # 仕事用アカウント
   Host github.com-rahul-office
       HostName github.com
       User git
       IdentityFile ~/.ssh/github-rahul-office

   # 個人用アカウント
   Host github.com-rahul-personal
       HostName github.com
       User git
       IdentityFile ~/.ssh/github-rahul-personal
   ```

---

### **ステップ5: アカウントを使い分けてリポジトリをクローンする**
1. **クローンコマンドの使用**:
   ```sh
   git clone git@github.com-{アカウント名}:{リポジトリ所有者}/{リポジトリ名}.git
   ```
   例:
   ```sh
   git clone git@github.com-rahul-personal:rahul-personal/TestRepo.git
   ```

2. **リポジトリごとの設定**:
   ```sh
   git config user.email "メールアドレス"
   git config user.name "名前"
   ```

3. **リモートの追加**:
   ```sh
   git remote add origin git@github.com-{アカウント名}:{アカウント名}
   ```

---

これにより、1台のマシン上で複数のGitHubアカウントを効率的に使い分けることができます。