import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async login(credentials: { usuario: string; contrasena: string }): Promise<any> {
    try {
      const usuario = await this.usuarioRepository.query(
        'SELECT * FROM usuarios WHERE usuario = ? LIMIT 1',
        [credentials.usuario],
      );

      if (usuario && usuario.length > 0) {
        console.log('Contraseña almacenada:', usuario[0].contrasena);
        const contrasenaValida = await bcrypt.compare(credentials.contrasena, usuario[0].contrasena);
        console.log(contrasenaValida);
        if (contrasenaValida) {
          return { mensaje: 'Inicio de sesión exitoso', datos: usuario[0] };
        } else {
          console.error('Contraseña proporcionada:', credentials.contrasena);
          throw new UnauthorizedException('La contraseña proporcionada es incorrecta');
        }
      } else {
        throw new UnauthorizedException('No se encontró un usuario con ese nombre');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  }
  
  async registro(usuario: UsuarioEntity): Promise<any> {
    console.log('Registro de usuario:', usuario);

    // Hash de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
    usuario.contrasena = hashedPassword;

    try {
      const resultado = await this.usuarioRepository.save(usuario);
      return { mensaje: 'Registro exitoso', datos: resultado };
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }
}
