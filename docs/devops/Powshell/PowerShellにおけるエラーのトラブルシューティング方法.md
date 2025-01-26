---
id: powshell-error-troubleshooting
sidebar_position: 3
---

# PowerShellにおけるエラーのトラブルシューティング方法

PowerShellでスクリプトを実行している際に、時折エラーに遭遇することがあります。特に初心者の方にとって、エラーメッセージは難解で、どこを修正すればよいのか分かりにくい場合があります。このノートでは、PowerShellでよくあるエラーとその対処法について解説します。

---

**1. 引用符の不一致による「>>」の表示**

PowerShellで「>>」というプロンプトが表示される場合、これはコマンドがまだ完結していないことを示しています。通常、引用符（`"` または `'`）や括弧が閉じられていない場合に発生します。

- **原因**: スクリプトやコマンドの中で開いた引用符や括弧が閉じられていない。
- **対策**: コマンド全体を確認し、開いた引用符や括弧が正しく閉じられているかチェックします。

   例:
   ```powershell
   Write-Host "Hello, PowerShell  # 引用符が閉じられていない例
   ```

   この場合、引用符を閉じて以下のように修正します：

   ```powershell
   Write-Host "Hello, PowerShell"
   ```

---

**2. ファイルパスの不正による「CommandNotFoundException」**

PowerShellでファイルを実行する際、パスの指定が正しくないと「CommandNotFoundException」エラーが発生します。特に、Windowsパスに含まれる「`C:\Users\ユーザー名\`」のような記述で発生しやすいです。

- **原因**: ファイルパスの指定ミス、もしくは`&`（呼び出し演算子）の不足。
- **対策**: パスを二重引用符で囲み、ファイルを実行する際には`&`演算子を使用します。また、`Test-Path`コマンドでパスの存在を確認することも有効です。

   例:
   ```powershell
   & "C:\Users\ユーザー名\Documents\script.ps1"
   ```

   また、パスが存在するか確認するには以下のコマンドを使用します：

   ```powershell
   Test-Path "C:\Users\ユーザー名\Documents\script.ps1"
   ```

---

**3. 実行ポリシーによる「Script is not digitally signed」エラー**

PowerShellは、スクリプトのセキュリティを保護するために実行ポリシーを設定しています。このため、スクリプトの実行が制限されている場合があります。

- **原因**: 実行ポリシーが「Restricted」や「AllSigned」に設定されており、スクリプトの実行が許可されていない。
- **対策**: `Set-ExecutionPolicy`コマンドで実行ポリシーを変更します。一般的に「RemoteSigned」や「Bypass」に設定することでスクリプト実行が可能になります。

   例:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

   > 注意: 実行ポリシーを変更する際は、セキュリティリスクを理解した上で設定してください。

---

**4. 変数やコマンドの認識エラー**

PowerShellでは、変数の定義ミスや未定義のコマンドを呼び出すと「Variable is not set」や「The term 'XXXX' is not recognized」といったエラーが発生します。

- **原因**: コマンドや変数の名前が間違っている、もしくは変数が定義されていない。
- **対策**: 変数名やコマンド名が正しいか確認し、必要に応じて`Get-Command`を使ってコマンドが存在するか確認します。

   例:
   ```powershell
   $myVariable = "PowerShell"
   Write-Host $myVarable  # 「myVariable」ではなく「myVarable」と誤記
   ```

   正しいコード：
   ```powershell
   $myVariable = "PowerShell"
   Write-Host $myVariable
   ```

---

**5. エラーの詳細確認：`$Error`変数の活用**

PowerShellでは、スクリプト実行中に発生したエラーは自動的に`$Error`変数に格納されます。この変数を確認することで、エラーの詳細な情報を取得し、原因を特定することができます。

- **方法**: エラーが発生したら、`$Error[0]`で最新のエラー情報を取得できます。
  
   例:
   ```powershell
   $Error[0]
   ```

   これにより、エラーの詳細な内容と発生箇所がわかるため、解決策を見つけやすくなります。

---

**まとめ**

PowerShellは強力なスクリプト環境ですが、特有のエラーも多くあります。

エラーメッセージをよく読み、上記の方法で原因を特定することで、スクリプトのトラブルシューティングがスムーズになります。特に引用符の不一致や変数の誤記は頻繁に発生するため、意識して確認することが重要です。

これらのポイントを押さえて、PowerShellの活用をより効率的に進めてみてください。