import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  async registro(@Body() usuario: UsuarioEntity): Promise<any> {
    try {
      const resultado = await this.usuariosService.registro(usuario);
      return resultado;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error durante el registro',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() credentials: { usuario: string; contrasena: string }): Promise<any> {
    try {
      const resultado = await this.usuariosService.login(credentials);
      return resultado;
    } catch (error) {
      let mensajeError = '';

      if (error.message.includes('contrasena')) {
        mensajeError = 'La contraseña proporcionada es incorrecta';
      } else if (error.message.includes('usuario')) {
        mensajeError = 'No se encontró un usuario con ese nombre';
      }
    }
  }
}
