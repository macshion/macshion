---
id: powshell-basic-and-use-scenario
sidebar_position: 1
---

# PowerShellとは何ですか

PowerShellは、Windowsで標準搭載されている強力なコマンドラインシェルおよびスクリプト言語です。従来のコマンドプロンプト（cmd）に比べ、より高度なシステム管理や自動化の機能が提供されており、ITプロフェッショナルや開発者の間で幅広く利用されています。PowerShellは、Windowsのみならず、LinuxやmacOSでも利用可能なため、クロスプラットフォームでの管理にも便利です。

**2. PowerShellの基本機能**

PowerShellの特徴的な機能として、以下が挙げられます：

- **コマンドレット（Cmdlet）**: PowerShellのコマンドは「コマンドレット」と呼ばれ、`Get-Process`や`Set-Item`など、`動詞-名詞`の形式で構成されています。この形式により、コマンドの意図が直感的に理解しやすくなります。

- **オブジェクト指向**: PowerShellは、結果をテキストではなくオブジェクトとして扱います。例えば、`Get-Process`コマンドはプロセスの情報をオブジェクトとして返し、そのままフィルタリングやプロパティの取得に利用できます。

- **パイプライン**: 複数のコマンドを組み合わせることで、データを連続的に処理することができます。例えば、`Get-Process | Where-Object { $_.CPU -gt 100 }`のようにして、特定の条件を満たすプロセスのみを取得することができます。

**3. PowerShellの活用シーン**

PowerShellは、Windowsの管理を効率化し、自動化するためにさまざまな場面で活用されています。以下はその一部です：

- **システム管理**: ユーザーの管理、ディスク容量の確認、プロセスの監視など、Windowsシステムの運用に必要なタスクを一括で実行できます。

- **ファイル操作**: フォルダ内のファイル一覧の取得やファイルのコピー、削除、リネームなど、ファイルシステムの管理も容易です。

- **ネットワーク設定**: ネットワークアダプタの情報取得やIPアドレスの設定、ネットワーク接続の監視など、ネットワーク関連の操作もスクリプトで自動化可能です。

- **自動化スクリプト**: 日常的な管理作業や定期的なジョブを自動化し、効率を高めることができます。たとえば、バックアップの作成や、特定の日時に実行されるタスクの設定が可能です。

**4. PowerShellスクリプトの実行方法**

PowerShellでスクリプトを実行するには、まずスクリプトファイル（通常は`.ps1`拡張子）を作成し、PowerShellから実行します。具体的な手順は以下の通りです：

1. **スクリプトの作成**: メモ帳やVS Codeなどのエディタを使用し、`.ps1`拡張子でスクリプトファイルを保存します。
   
   例:
   ```powershell
   Write-Host "Hello, PowerShell!"
   ```

2. **PowerShellを管理者として起動**: スクリプトの実行には管理者権限が必要な場合もあるため、PowerShellを「管理者として実行」することをお勧めします。

3. **実行ポリシーの設定**: 初めてスクリプトを実行する際には、実行ポリシーを変更する必要がある場合があります。次のコマンドでポリシーを変更できます：

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

4. **スクリプトの実行**: スクリプトを保存したディレクトリに移動し、`.\スクリプト名.ps1`で実行します。

   ```powershell
   .\Hello.ps1
   ```

**5. PowerShellの応用**

PowerShellは、Windows環境を越えて、LinuxやmacOSでも利用可能で、これにより異なるOS間でのスクリプトの共通化が可能です。また、AzureやAWSといったクラウドサービスの管理もPowerShellで行えるため、ITインフラの統合管理にも強力なツールです。

---

PowerShellは、単なるコマンドラインツールではなく、強力なスクリプト言語でもあります。その豊富な機能と柔軟性により、日常のタスクから複雑なシステム管理まで、幅広い用途で活用することが可能です。初心者の方もまずは基本的なコマンドから始めて、徐々に応用範囲を広げてみてください。