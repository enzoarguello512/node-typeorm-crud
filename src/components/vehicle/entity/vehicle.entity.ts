import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../../brand/entity/brand.entity';
import { Color } from '../../color/entity/color.entity';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  year?: number;

  @Column({
    nullable: true,
  })
  brandId: number;
  @ManyToOne(() => Brand, (brand) => brand.vehicles, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  model: string;

  // Customized table for many-to-many union
  @ManyToMany(() => Color, (color) => color.vehicles)
  @JoinTable({
    name: 'vehicles_colors',
    inverseJoinColumn: {
      name: 'color_id',
    },
    joinColumn: {
      name: 'vehicle_id',
    },
  })
  colors: Color[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
