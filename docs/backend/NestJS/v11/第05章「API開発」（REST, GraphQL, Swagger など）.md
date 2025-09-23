---
id: 5
sidebar_position: 5
---
# 第05章 API開発

NestJS は **REST API**・**GraphQL API** の両方を簡単に構築でき、さらに **Swagger** を使ってドキュメント化できます。

------

### 5.1 REST API

#### コントローラーでルーティング

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns user #${id}`;
  }

  @Post()
  create(@Body() createUserDto: any): string {
    return `This action adds a new user: ${createUserDto.name}`;
  }
}
```

- `@Controller('users')` → `/users` をベースパスにする
- `@Get()`, `@Post()` などで HTTP メソッドに対応
- `@Param()`, `@Body()` でリクエストデータを取得

------

#### DTO（Data Transfer Object）

- データ受け渡し用クラス
- `class-validator` と併用して入力検証

```ts
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
@Post()
create(@Body() dto: CreateUserDto) {
  return this.userService.create(dto);
}
```

➡️ `ValidationPipe` を有効化すれば、入力が自動チェックされる。

------

### 5.2 GraphQL API

NestJS は `@nestjs/graphql` パッケージを利用して GraphQL をサポート。
 **Schema First** と **Code First** の2つのアプローチがある。

#### 1. インストール

```bash
npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

#### 2. 設定（Code First）

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true, // スキーマ自動生成
    }),
  ],
})
export class AppModule {}
```

#### 3. Resolver の作成

```ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  private users: User[] = [];

  @Query(() => [User])
  getUsers() {
    return this.users;
  }

  @Mutation(() => User)
  createUser(@Args('name') name: string, @Args('email') email: string) {
    const user = { id: this.users.length + 1, name, email };
    this.users.push(user);
    return user;
  }
}
```

➡️ GraphQL Playground でクエリ可能。

------

### 5.3 Swagger (OpenAPI)

NestJS は `@nestjs/swagger` で API ドキュメントを自動生成できる。
 → フロントエンドや他サービスと連携する際に非常に便利。

#### 1. インストール

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

#### 2. セットアップ

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('User management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

➡️ `http://localhost:3000/api-docs` にアクセスすると Swagger UI が表示される。

#### 3. DTO にアノテーションを追加

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Taro Yamada', description: 'ユーザー名' })
  name: string;

  @ApiProperty({ example: 'taro@example.com', description: 'メールアドレス' })
  email: string;
}
```

➡️ 自動的に Swagger に反映される。

------

### 5.4 まとめ

- **REST API**：デコレーターを使い直感的にルーティング。
- **GraphQL API**：Schema First / Code First 両方対応。
- **Swagger**：`@nestjs/swagger` で自動ドキュメント化可能。