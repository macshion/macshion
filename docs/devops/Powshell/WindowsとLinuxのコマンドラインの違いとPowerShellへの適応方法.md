---
id: powshell-windows-linux-command-line-difference
sidebar_position: 4
---

# WindowsとLinuxのコマンドラインの違いとPowerShellへの適応方法

LinuxユーザーがWindowsのPowerShellを使う際、最初に感じるのはコマンドの違いと構文の習慣です。WindowsとLinuxのコマンドラインには基本的な違いが多く、特にPowerShellはLinuxのShellとは異なる操作体系を持っています。ここでは、LinuxのShellに慣れたユーザーがPowerShellに適応するためのポイントを解説します。

---

**1. コマンド体系の違い**

LinuxとWindowsのコマンドラインで使われるコマンドは、それぞれ独自のものです。PowerShellはWindows専用のコマンドを持っているだけでなく、Linuxとは異なるコマンドの体系やオブジェクト指向を採用しています。

- **Linuxのコマンド例**：`ls`、`cat`、`grep`、`cp`、`mv`
- **PowerShellのコマンド例**：`Get-ChildItem`（`ls`の代わり）、`Get-Content`（`cat`の代わり）、`Select-String`（`grep`の代わり）

PowerShellでは、`動詞-名詞`の形でコマンドレットが構成されており、これが一般的な命名規則です。例えば、ファイルの内容を表示する場合は、Linuxでは`cat`コマンドですが、PowerShellでは`Get-Content`が使用されます。

---

**2. ディレクトリとファイル操作**

ディレクトリの操作においても、LinuxとPowerShellで異なるコマンドが使われます。以下は代表的なディレクトリ操作の比較です：

| 操作          | Linuxコマンド   | PowerShellコマンド       |
|---------------|----------------|--------------------------|
| カレントディレクトリの確認 | `pwd`         | `Get-Location`           |
| ディレクトリの内容一覧   | `ls`          | `Get-ChildItem`          |
| ディレクトリの作成       | `mkdir`       | `New-Item -ItemType Directory` |
| ファイルのコピー         | `cp`          | `Copy-Item`              |
| ファイルの移動/名前変更 | `mv`          | `Move-Item`              |
| ファイルの削除           | `rm`          | `Remove-Item`            |

Linuxの`ls`コマンドに相当するPowerShellコマンドは`Get-ChildItem`ですが、`ls`もエイリアスとして使用可能です。このように、PowerShellではLinuxの一部のコマンドをエイリアスとして対応しています。

---

**3. エイリアス機能の活用**

PowerShellでは、Linuxで使われる一般的なコマンド（`ls`、`cat`、`pwd`など）に対応するエイリアスが用意されています。これにより、Linuxユーザーもある程度は馴染みのコマンドを使って操作することができます。

例：
```powershell
ls       # 実際にはGet-ChildItemを実行
cat      # 実際にはGet-Contentを実行
pwd      # 実際にはGet-Locationを実行
```

ただし、エイリアスは標準のPowerShellコマンドとは異なるため、エイリアスに依存せず、PowerShellのコマンドレットに慣れておくと便利です。

---

**4. パイプラインとオブジェクト指向の違い**

Linuxでは、パイプ（`|`）を使ってコマンドの出力を次のコマンドに渡しますが、すべてがテキストベースです。一方、PowerShellのパイプラインはオブジェクトを渡す仕組みであり、これにより特定のプロパティに直接アクセスできます。

- **Linuxの例**：
   ```bash
   ps aux | grep nginx
   ```

- **PowerShellの例**：
   ```powershell
   Get-Process | Where-Object {$_.ProcessName -eq "nginx"}
   ```

PowerShellでは、`$_`を使ってパイプラインで流れるオブジェクトのプロパティにアクセスします。また、出力をテキストで処理する必要がなく、オブジェクトのまま処理できるため、柔軟性が高くなっています。

---

**5. リダイレクトとファイル操作**

Linuxでよく使われるリダイレクト（`>`、`>>`）もPowerShellで利用可能です。しかし、PowerShellではリダイレクト用のコマンドレットも提供されています。

- **Linuxの例**：
   ```bash
   ls > output.txt
   echo "追加内容" >> output.txt
   ```

- **PowerShellの例**：
   ```powershell
   Get-ChildItem > output.txt
   Add-Content -Path output.txt -Value "追加内容"
   ```

PowerShellの`Out-File`や`Add-Content`コマンドレットを使えば、リダイレクトや内容追加が行えます。エイリアスとしての`>`も利用可能ですが、PowerShellの標準コマンドを覚えておくと応用が利きます。

---

**6. 環境変数の取り扱い**

環境変数の操作方法も、LinuxとPowerShellで異なります。Linuxでは`$VARIABLE`として環境変数にアクセスしますが、PowerShellでは`$env:VARIABLE`形式を使用します。

- **Linuxの例**：
   ```bash
   echo $PATH
   ```

- **PowerShellの例**：
   ```powershell
   echo $env:Path
   ```

PowerShellでは、環境変数を設定する際も`$env:`を使います。例として、`$env:Path`に新しいパスを追加することが可能です。

---

**7. スクリプトファイルの実行**

Linuxではシェルスクリプト（`.sh`ファイル）を実行しますが、PowerShellでは`.ps1`拡張子のスクリプトが標準です。また、スクリプト実行には実行ポリシーの設定が必要な場合があります。

- **Linuxのスクリプト実行**：
   ```bash
   ./script.sh
   ```

- **PowerShellのスクリプト実行**：
   ```powershell
   .\script.ps1
   ```

スクリプトを初めて実行する際、PowerShellでは実行ポリシーを設定する必要があるかもしれません。以下のコマンドで実行ポリシーを変更します：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

**まとめ**

PowerShellはLinuxのShellとは異なる操作性を持っていますが、多くのLinuxコマンドがエイリアスとして利用可能なため、Linuxユーザーでも基本操作をすぐに習得できます。また、PowerShellのオブジェクト指向パイプラインを活用すれば、より強力なシステム管理が可能になります。少しずつPowerShellのコマンドや構文に慣れていくことで、Windows環境でも効率的な操作ができるようになります。