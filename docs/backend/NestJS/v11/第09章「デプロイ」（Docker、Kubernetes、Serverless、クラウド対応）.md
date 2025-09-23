---
id: 9
sidebar_position: 9
---
# 第09章 デプロイ

NestJS アプリは Node.js ベースなので、さまざまな環境へ柔軟にデプロイ可能です。
 主な手法は以下の4つ：

- **Docker**
- **Kubernetes**
- **Serverless（AWS Lambda など）**
- **クラウドプロバイダ（Heroku / AWS ECS / GCP / Azure など）**

------

### 9.1 Docker デプロイ

NestJS はコンテナ化が容易。

#### Dockerfile 例

```dockerfile
# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install --production

# アプリコードコピー
COPY . .

# ビルド
RUN npm run build

# ポート公開
EXPOSE 3000

# 起動コマンド
CMD ["node", "dist/main.js"]
```

#### 実行

```bash
docker build -t nest-app .
docker run -p 3000:3000 nest-app
```

------

### 9.2 Kubernetes デプロイ

大規模環境では Kubernetes を利用。

#### Deployment マニフェスト例

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nest-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nest-app
  template:
    metadata:
      labels:
        app: nest-app
    spec:
      containers:
        - name: nest-app
          image: nest-app:latest
          ports:
            - containerPort: 3000
```

#### Service マニフェスト例

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nest-service
spec:
  type: LoadBalancer
  selector:
    app: nest-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

------

### 9.3 Serverless デプロイ

NestJS は AWS Lambda / Google Cloud Functions / Azure Functions などに対応可能。

#### AWS Lambda デプロイ例

1. **依存関係インストール**

```bash
npm install @nestjs/cli serverless serverless-http
```

1. **ハンドラー作成**

```ts
import { Handler } from 'aws-lambda';
import { Server } from 'http';
import { createApp } from './main';
import * as serverless from 'serverless-http';

let server: Server;

export const handler: Handler = async (event, context) => {
  if (!server) {
    const app = await createApp();
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  return serverless(server)(event, context);
};
```

1. **serverless.yml 設定**

```yaml
service: nest-app
provider:
  name: aws
  runtime: nodejs20.x
functions:
  main:
    handler: dist/lambda.handler
    events:
      - http:
          path: /
          method: any
```

------

### 9.4 クラウドプロバイダ

- **Heroku** → 簡単にデプロイ可能（ただし有料化後は利用減）
- **AWS ECS / Fargate** → Docker ベースで本番運用に最適
- **GCP Cloud Run** → Docker イメージをサーバレス実行
- **Azure App Service** → Node.js アプリを簡単にホスティング

------

### 9.5 ベストプラクティス

- **環境変数** で設定を管理（ConfigModule と併用）
- **マルチステージビルド** を使って Docker イメージを軽量化
- 本番環境では **プロセスマネージャ（PM2, systemd）** を利用して安定稼働
- ログ・監視は **クラウドのモニタリングサービス（CloudWatch, Stackdriver, Application Insights 等）** と連携

------

### 9.6 まとめ

- **Docker** → 最も基本的なデプロイ方法
- **Kubernetes** → 大規模・高可用性に対応
- **Serverless** → コスト効率重視の軽量デプロイ
- **クラウドサービス** → AWS / GCP / Azure でマネージド運用可能