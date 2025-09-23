---
id: 4
sidebar_position: 4
---
# 第04章 データアクセス

NestJS は ORM / ODM を公式にサポートしており、データベース操作をシームレスに行えます。
 主に利用されるのは以下です：

- **TypeORM**（最も一般的）
- **Prisma**（次世代 ORM）
- **Sequelize**、**Mongoose (MongoDB)** など

------

### 4.1 TypeORM の利用

#### 1. インストール

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

#### 2. モジュール設定

`AppModule` に `TypeOrmModule` をインポートし、接続設定を記述：

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',       // DBの種類（mysql / postgres / sqlite / etc.）
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test_db',
      entities: [User],    // 使用するエンティティ
      synchronize: true,   // 自動でテーブルを同期（本番ではfalse推奨）
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class AppModule {}
```

------

#### 3. エンティティ（Entity）の定義

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;
}
```

- `@Entity('users')` → `users` テーブルにマッピング
- `@Column()` → DB の列を定義
- `@PrimaryGeneratedColumn()` → 主キー（AUTO_INCREMENT）

------

#### 4. リポジトリを使った操作

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }

  create(user: Partial<User>): Promise<User> {
    return this.usersRepo.save(user);
  }
}
```

------

### 4.2 Prisma の利用

NestJS は Prisma もサポート。高速で型安全な ORM。

#### 1. インストール

```bash
npm install @prisma/client
npm install -D prisma
```

#### 2. Prisma 設定

```bash
npx prisma init
```

`prisma/schema.prisma` に DB 定義を書く：

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

#### 3. マイグレーション

```bash
npx prisma migrate dev --name init
```

#### 4. Service で利用

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.user.findMany();
  }
}
```

------

### 4.3 他の DB サポート

- **Sequelize** → SQL ベース ORM、学習コスト低め。
- **Mongoose** → MongoDB 用 ODM。
- **Knex.js** → クエリビルダー（軽量）。

------

### 4.4 ベストプラクティス

- **本番では `synchronize: false` を推奨** → 代わりに **migration** を使う。
- DTO + ValidationPipe を併用して、DB 保存前に必ずバリデーション。
- リポジトリパターンを使うことで、テストや保守性を高める。

------

### 4.5 まとめ

- NestJS は **TypeORM** と **Prisma** が主流。
- **エンティティ（Entity）** で DB モデルを定義し、**リポジトリ** で操作するのが基本。
- Prisma を使う場合は **スキーマ駆動**で型安全な DB 操作が可能。
- DB とのやり取りは **Service 層**にまとめ、Controller から直接書かないのがベスト。