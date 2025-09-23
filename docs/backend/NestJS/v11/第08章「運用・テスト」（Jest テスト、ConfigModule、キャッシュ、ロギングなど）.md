---
id: 8
sidebar_position: 8
---
# 第08章 運用・テスト

NestJS はテスト容易性・運用性を重視して設計されています。
 ここでは以下の機能を扱います：

- テスト（ユニットテスト / E2E テスト）
- 設定管理（ConfigModule）
- キャッシュ（Redis 等）
- ロギング

------

### 8.1 テスト

NestJS は **Jest** を標準テストランナーとしてサポート。

#### ユニットテスト例

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should return "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });
});
```

#### E2E テスト例

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```

➡️ `npm run test:e2e` で実行可能。

------

### 8.2 設定管理（ConfigModule）

アプリの環境変数や設定を集中管理できる。

#### インストール

```bash
npm install --save @nestjs/config
```

#### 設定ファイル

```
.env
DB_HOST=localhost
DB_PORT=3306
```

#### モジュール導入

```ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全モジュールで利用可
    }),
  ],
})
export class AppModule {}
```

#### 使い方

```ts
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getDbHost() {
    return this.config.get<string>('DB_HOST');
  }
}
```

------

### 8.3 キャッシュ

NestJS は標準でキャッシュ機能を提供。
 デフォルトはメモリ、Redis など外部キャッシュとも連携可能。

#### インストール

```bash
npm install cache-manager
npm install cache-manager-redis-store
```

#### 設定

```ts
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // 秒
      max: 100, // 最大キャッシュ数
    }),
  ],
})
export class AppModule {}
```

#### 利用

```ts
@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getUser(id: number) {
    const cached = await this.cacheManager.get(`user-${id}`);
    if (cached) return cached;

    const user = { id, name: 'Taro' }; // DBから取得する想定
    await this.cacheManager.set(`user-${id}`, user, { ttl: 60 });
    return user;
  }
}
```

------

### 8.4 ロギング

NestJS はデフォルトでロガーを持っており、カスタマイズ可能。

#### デフォルト利用

```ts
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('Hello World accessed');
    return 'Hello World!';
  }
}
```

#### カスタムロガー

- Winston, Pino などのライブラリと統合可能。
- 例：`@nestjs/winston` を利用して構造化ログを出力。

------

### 8.5 まとめ

- **テスト** → Jest を標準サポート（ユニット・E2E どちらも容易）
- **ConfigModule** → `.env` などから設定を集中管理
- **キャッシュ** → メモリ / Redis を利用して高速化
- **ロギング** → デフォルトロガー or 外部ライブラリ（Winston 等）で柔軟に拡張