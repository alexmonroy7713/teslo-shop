import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Prodcucts } from './product.entity';

@Entity()
export class ProdcuctImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Prodcucts, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Prodcucts;
}
