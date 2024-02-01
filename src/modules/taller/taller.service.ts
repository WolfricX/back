// taller/taller.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './taller.entity';

@Injectable()
export class TallerService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
  ) {}

  async findAll(): Promise<Taller[]> {
    return await this.tallerRepository.find();
  }

  async findByTrabajador(nombreTrabajador: string): Promise<Taller[]> {
    try {
      const talleres = await this.tallerRepository.find({ where: { empleado: nombreTrabajador } });
      return talleres;
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`No se encontraron talleres para el trabajador ${nombreTrabajador}`);
      }
      throw error;
    }
  }

  async create(tallerData: Partial<Taller>): Promise<Taller> {
    const taller = this.tallerRepository.create(tallerData);
    return await this.tallerRepository.save(taller);
  }

  async update(nombreCliente: string, id_: number, tallerData: Partial<Taller>): Promise<Taller | undefined> {
    const taller = await this.tallerRepository.findOne({ where: { cliente: nombreCliente, id: id_ } });

    if (!taller) {
      throw new NotFoundException(`Taller con cliente ${nombreCliente} no encontrado`);
    }

    await this.tallerRepository.update(taller.id, tallerData);

    // Recuperar el taller actualizado
    return await this.tallerRepository.findOneBy(taller);
  }

  async remove(id: number): Promise<void> {
    await this.tallerRepository.delete(id);
  }
}
