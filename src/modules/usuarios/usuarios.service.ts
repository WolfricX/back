import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async registro(usuario: UsuarioEntity) {
    try {
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error('Error al guardar el usuario en la base de datos:', error.message);
      throw error;
    }
  }
}
