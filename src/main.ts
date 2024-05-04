import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { NestFactory } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: false
  }))


  await app.listen(3000);
}
bootstrap();
