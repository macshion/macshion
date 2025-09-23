---
id: 6
sidebar_position: 6
---
# 第06章 セキュリティ

NestJS はセキュリティ対策をフレームワークレベルで統合しています。
 主な機能は以下です：

- **認証（Authentication）**
- **認可（Authorization）**
- **JWT 認証**
- **CORS**
- **Helmet（HTTPヘッダー強化）**

------

### 6.1 認証（Authentication）

NestJS は **Passport.js** を公式に統合しており、様々なストラテジー（Local / JWT / OAuth2 など）が利用可能。

#### インストール

```bash
npm install @nestjs/passport passport
npm install @types/passport --save-dev
```

#### LocalStrategy の例

```ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' }); // デフォルトは "username"
  }

  async validate(email: string, password: string): Promise<any> {
    // DBからユーザー検索 & パスワード検証
    if (email === 'test@example.com' && password === 'secret') {
      return { userId: 1, email };
    }
    return null;
  }
}
```

➡️ 認証成功時は `req.user` にユーザー情報が格納される。

------

### 6.2 JWT 認証

トークンベースの認証に便利。

#### インストール

```bash
npm install @nestjs/jwt passport-jwt
npm install @types/passport-jwt --save-dev
```

#### JWT Strategy

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

➡️ リクエストの `Authorization: Bearer <token>` を自動解析。

------

### 6.3 認可（Authorization）

- **認証**（Authentication）：ユーザーの「本人確認」
- **認可**（Authorization）：ユーザーが「何をしてよいか」

NestJS では **Guard** を使って実現。

📌 例：Role Guard

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user?.role === 'admin'; // 管理者のみ許可
  }
}
```

------

### 6.4 CORS（Cross-Origin Resource Sharing）

クロスオリジンアクセスを制御。

```ts
const app = await NestFactory.create(AppModule, { cors: true });
```

オプションを細かく設定も可能：

```ts
app.enableCors({
  origin: 'https://example.com',
  methods: 'GET,POST',
  credentials: true,
});
```

------

### 6.5 Helmet

HTTP ヘッダーを適切に設定してセキュリティを強化。

#### インストール

```bash
npm install helmet
```

#### 有効化

```ts
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  await app.listen(3000);
}
```

------

### 6.6 その他のセキュリティ対策

- **CSRF 対策** → `csurf` ミドルウェアを組み込み可能
- **Rate Limiting** → `@nestjs/throttler` を使ってリクエスト回数制限
- **HTTPS** → Nginx / ALB などと組み合わせて導入

------

### 6.7 まとめ

- **Passport.js** で多様な認証戦略を統合
- **JWT** で stateless 認証を実現
- **Guard** で認可を制御
- **CORS / Helmet / CSRF / Rate Limit** で API を保護