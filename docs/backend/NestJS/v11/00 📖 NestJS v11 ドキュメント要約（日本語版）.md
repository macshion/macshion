---
id: index
sidebar_position: 0
---
# NestJS v11 チートシート

## [1. はじめに](/docs/backend/NestJS/v11/1)

* TypeScript ネイティブなサーバーサイドフレームワーク
* Express / Fastify をベース
* 特徴：モジュール化、DI、デコレーター、豊富な公式パッケージ

---

## [2. 基本構造](/docs/backend/NestJS/v11/2)

* **Module**: `@Module()` → imports, controllers, providers, exports
* **Controller**: `@Controller()`, `@Get()`, `@Post()` → ルーティング
* **Provider**: `@Injectable()` → ビジネスロジック
* **DI**: constructor で依存を自動注入

---

## [3. コア概念](/docs/backend/NestJS/v11/3)

* **デコレーター** → `@Get()`, `@Param()`, `@Body()`
* **Pipe** → 変換 & バリデーション（例：`ValidationPipe`, `ParseIntPipe`）
* **Guard** → 認可（例：`AuthGuard`）
* **Interceptor** → 前後処理（ログ, レスポンス変換, キャッシュ）
* **Exception Filter** → 例外ハンドリング（`HttpExceptionFilter`）

---

## [4. データアクセス](/docs/backend/NestJS/v11/4)

* **TypeORM** → Entity + Repository で操作
* **Prisma** → Schema First, 型安全
* Sequelize / Mongoose も利用可能
* ベストプラクティス：Migration 管理、DTO + ValidationPipe

---

## [5. API 開発](/docs/backend/NestJS/v11/5)

* **REST API**: Controller + DTO + Service
* **GraphQL API**: Code First / Schema First
* **Swagger**: `@nestjs/swagger` → 自動 API ドキュメント

---

## [6. セキュリティ](/docs/backend/NestJS/v11/6)

* **認証**: Passport.js（Local, JWT, OAuth2）
* **JWT**: `@nestjs/jwt`, `Authorization: Bearer <token>`
* **Guard**: ロール・権限管理
* **CORS**: `app.enableCors()`
* **Helmet**: `app.use(helmet())`
* **Rate Limit**: `@nestjs/throttler`

---

## [7. 高度な機能](/docs/backend/NestJS/v11/7)

* **Microservices**: gRPC / Redis / Kafka / RabbitMQ
* **WebSocket**: `@WebSocketGateway()`, `@SubscribeMessage()`
* **Scheduling**: `@Cron()`, `@Interval()`, `@Timeout()`
* **Queues**: Bull（Redis ベース）でジョブ管理

---

## [8. 運用・テスト](/docs/backend/NestJS/v11/8)

* **テスト**: Jest（ユニット & E2E）
* **ConfigModule**: `.env` 管理
* **キャッシュ**: `CacheModule` + Redis
* **ロギング**: Logger（Winston / Pino と統合可）

---

## [9. デプロイ](/docs/backend/NestJS/v11/9)

* **Docker**: コンテナ化 → `docker run -p 3000:3000`
* **Kubernetes**: Deployment + Service
* **Serverless**: AWS Lambda, Cloud Functions
* **クラウド**: AWS ECS/Fargate, GCP Cloud Run, Azure App Service

---

## [10. 学習ステップ](/docs/backend/NestJS/v11/10)

1. Controller / Service / Module を理解
2. DB 連携（TypeORM / Prisma）
3. Passport.js + JWT 認証
4. WebSocket / Queue / Cron Job
5. Jest テスト + ConfigModule
6. Docker / K8s / CI/CD で本番運用