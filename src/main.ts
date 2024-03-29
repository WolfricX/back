// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as fs from 'fs';
import * as https from 'https';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const httpsOptions = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem'),
  };

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { httpsOptions }
  );

  app.enableCors(); // Habilita CORS

  // Agregar manejador de errores global
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  });

  await app.listen(3000);
}

bootstrap();
