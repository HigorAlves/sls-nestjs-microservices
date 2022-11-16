import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { UserModule } from '@/src/user.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(UserModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export async function handler(
  event: any,
  context: Context,
  callback: Callback,
): Promise<Handler> {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}
