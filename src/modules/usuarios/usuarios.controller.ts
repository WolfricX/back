import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post('registro')
async registro(@Body() usuario: UsuarioEntity) {
  console.log('Solicitud de registro recibida:', usuario);
  try {
    const resultado = await this.usuariosService.registro(usuario);
    console.log('Resultado del registro:', resultado);
    return resultado;
  } catch (error) {
    console.error('Error durante el registro:', error);
    throw error;
  }
}

}
