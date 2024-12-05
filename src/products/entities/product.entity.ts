import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProdcuctImage } from './age.entity';


@Entity()
export class Prodcucts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('numeric', { default: 0 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', { array: true, default: [''] })
  tags: string[];

  @OneToMany(() => ProdcuctImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images: ProdcuctImage[];
}
