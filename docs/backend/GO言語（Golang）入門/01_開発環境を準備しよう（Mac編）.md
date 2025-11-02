---
title: "Goの開発環境を準備しよう（Mac編）"
slug: course-go-01-setup-mac
---
## Goのインストール

1. ターミナルを開く

2. brewのインストール
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

3. brewのバージョン確認
    ```bash
    brew --version
    ```

4. Goのインストール
    ```bash
    brew install go
    ```

5. Goのインストール確認
    ```bash
    go version
    ```

## VS Codeのインストール
1. 公式サイトを開く（https://code.visualstudio.com/download）
2. Macのインストーラーをクリックし、インストール
3. VS Codeを起動し、拡張機能から「Go」をインストール

## Goのワークスペースを作成する
1. ターミナルでホームディレクトリに移動
    ```bash
    cd ~
    ```

2. Goのワークスペース用のディレクトリを作成
    ```bash
    mkdir -p go/src
    ```

3. 初めてのGoプログラムを作成
    ```bash
    cd go/src
    mkdir hello
    cd hello
    touch hello.go
    ```

※ hello.go
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

4. プログラムの実行
    ```bash
    go run hello.go
    ```
