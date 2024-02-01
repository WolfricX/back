import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuarioEntity } from './usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]), // Importa la entidad de usuario aquí
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
