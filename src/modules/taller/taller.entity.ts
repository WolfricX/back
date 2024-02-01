// taller/entities/taller.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Taller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  tiempo: Date;

  @Column()
  cliente: string;

  @Column()
  servicio: string;

  @Column()
  empleado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo: number;

  @Column()
  estado: string;
}
