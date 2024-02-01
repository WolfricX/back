// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuarioEntity } from './usuarios/usuario.entity'; // Asegúrate de proporcionar la ruta correcta
import { Taller } from './taller/taller.entity';
import { TallerModule } from './taller/taller.module'; // Asegúrate de proporcionar la ruta correcta

@Module({
  imports: [
    // Otros módulos que puedas tener
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'taller',
      entities: [UsuarioEntity, Taller], // Incluye ambas entidades aquí
      synchronize: true,
      logging: true,
    }),
    UsuariosModule, // Importa el módulo de usuarios aquí
    TallerModule, // Importa el módulo de taller aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
