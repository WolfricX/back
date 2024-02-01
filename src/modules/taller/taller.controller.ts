// taller/controllers/taller.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TallerService } from './taller.service';
import { Taller } from './taller.entity';

@Controller('taller')
export class TallerController {
  constructor(private readonly tallerService: TallerService) {}

  @Get()
  findAll(): Promise<Taller[]> {
    return this.tallerService.findAll();
  }

  @Get(':nombreTrabajador')
  findByTrabajador(@Param('nombreTrabajador') nombreTrabajador: string): Promise<Taller[]> {
    return this.tallerService.findByTrabajador(nombreTrabajador);
  }

  @Post()
  create(@Body() tallerData: Taller): Promise<Taller> {
    return this.tallerService.create(tallerData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tallerService.remove(+id);
  }
}
