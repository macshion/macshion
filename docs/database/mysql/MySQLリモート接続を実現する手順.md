---
id: sql-conection
sidebar_position: 1
---

# MySQLリモート接続を実現する手順

MySQLのリモート接続について、調査や設定の過程をまとめました。Ubuntuで設置されたMySQL 8.0を使用している環境で、設定手順を説明します。

---

#### 正しいユーザー権限を付与する
MySQL 8.0以降の環境では、旧来の「GRANT ... IDENTIFIED BY」といった構文が使用できません。このため、下記のように新しい構文を使用します。

##### 現存ユーザーの権限を修正
1. MySQLにログイン
   ```bash
   mysql -u root -p
   ```

2. ユーザーのパスワードを変更し、リモート接続を許可
   ```sql
   ALTER USER 'username'@'localhost' IDENTIFIED BY 'your_password';
   CREATE USER 'username'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```

3. 権限が正しく設定されたか確認
   ```sql
   SELECT user, host FROM mysql.user WHERE user = 'username';
   ```

---

#### MySQLサーバーのリモート接続許可

1. **MySQL設定ファイルの修正**
   MySQLの接続は、デフォルトで「127.0.0.1」にバインドされています。これを「0.0.0.0」に変更する必要があります。

   ```bash
   sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
   ```
   下記を確認し、修正:
   ```plaintext
   bind-address = 0.0.0.0
   ```

2. **MySQLサービスのリスタート**
   ```bash
   sudo systemctl restart mysql
   ```

---

#### ファイアウォールの設定
ファイアウォールでMySQLのポート接続を許可する必要があります。

1. **UFWの設定**
   現在のルールを確認:
   ```bash
   sudo ufw status
   ```

   ポート3306を設定:
   ```bash
   sudo ufw allow 3306
   sudo ufw reload
   ```

2. **クラウドプラットフォームの場合**
   AWSやクラウドプラットフォームを使用している場合、安全グループを設定して「3306」ポートの入戦を許可してください。

---

#### 接続の確認

下記のように、ローカルマシーンから接続を試してください:

```bash
mysql -u username -h your_ip_address -p
```

---

これらの手順を通じて、無事にMySQLのリモート接続を実現できました。問題が発生した場合は、最新のエラーメッセージを歓迎します。

