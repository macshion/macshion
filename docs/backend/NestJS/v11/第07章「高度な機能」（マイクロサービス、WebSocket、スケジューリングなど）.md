---
id: 7
sidebar_position: 7
---
# 第07章 高度な機能

NestJS は REST API だけでなく、**マイクロサービス / WebSocket / バックグラウンド処理** など多様なアーキテクチャをサポートします。

------

### 7.1 マイクロサービス（Microservices）

NestJS は **gRPC, Kafka, Redis, RabbitMQ, NATS** など多様な通信方式をサポート。

#### インストール例（Redis）

```bash
npm install --save @nestjs/microservices redis
```

#### サーバー作成

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: { url: 'redis://localhost:6379' },
  });
  await app.listen();
}
bootstrap();
```

#### メッセージハンドラ

```ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data[0] + data[1]);
  }
}
```

➡️ クライアントが `{ cmd: 'sum' }` でメッセージを送ると計算結果を返す。

------

### 7.2 WebSockets

リアルタイム通信をサポート。デフォルトで **socket.io** を利用可能。

#### インストール

```bash
npm install --save @nestjs/websockets @nestjs/platform-socket.io
```

#### Gateway 定義

```ts
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return `Received: ${data}`;
  }
}
```

➡️ クライアントが `message` イベントを送信すると、サーバーが応答。

------

### 7.3 タスクスケジューリング（Scheduling）

定期実行タスク（cron, interval）を簡単に実装可能。

#### インストール

```bash
npm install --save @nestjs/schedule
npm install --save-dev @types/cron
```

#### 使い方

```ts
import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron('45 * * * * *') // 毎分45秒に実行
  handleCron() {
    console.log('Cron job executed at 45s');
  }

  @Interval(10000) // 10秒ごと
  handleInterval() {
    console.log('Interval task running');
  }

  @Timeout(5000) // アプリ起動から5秒後に一度だけ実行
  handleTimeout() {
    console.log('Timeout task executed');
  }
}
```

------

### 7.4 メッセージキュー（Queues）

バックグラウンドジョブ処理に便利。
 NestJS は **Bull (Redisベース)** を公式サポート。

#### インストール

```bash
npm install --save @nestjs/bull bull redis
```

#### 設定

```ts
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
    BullModule.registerQueue({ name: 'email' }),
  ],
})
export class AppModule {}
```

#### ジョブ追加

```ts
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendMail(data: any) {
    await this.emailQueue.add('send', data);
  }
}
```

#### プロセッサー

```ts
import { Processor, Process } from '@nestjs/bull';

@Processor('email')
export class EmailProcessor {
  @Process('send')
  handleSend(job: any) {
    console.log('Sending email to:', job.data.to);
  }
}
```

------

### 7.5 まとめ

- **マイクロサービス** → gRPC / Redis / Kafka など分散システム構築可能
- **WebSocket** → チャットや通知などリアルタイム通信が可能
- **スケジューリング** → cron, interval, timeout を使った定期処理
- **ジョブキュー** → Bull でバックグラウンド処理を安全に実行