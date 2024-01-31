import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { createServer } from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('localhost-key.pem'),
    cert: readFileSync('localhost.pem'),
  };

  const app = await NestFactory.create(
    AppModule,
    { httpsOptions }
  );

  await app.listen(3000, () => {
    console.log('Aplicación Nest.js iniciada en https://localhost:3000');
  });
}

bootstrap();
