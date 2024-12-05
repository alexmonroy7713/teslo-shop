import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prodcucts } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Prodcucts)
    private productRepository: Repository<Prodcucts>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { images = [], ...rest } = createProductDto;

    const product = this.productRepository.create({
      ...rest,
      images: images.map((url) => ({ url })), // Transformar imágenes a la entidad
    });

    await this.productRepository.save(product);
    return product;
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['images'], // Cargar relaciones si es necesario
    });
    return {
      mensaje: 'Datos encontrados',
      data: products,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images'], // Cargar imágenes relacionadas
    });

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return {
      mensaje: `Producto encontrado correctamente con el id: ${id}`,
      data: product,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...rest } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...rest,
      images: images ? images.map((url) => ({ url })) : undefined,
    });

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    await this.productRepository.save(product);
    return product;
  }

  async remove(id: string) {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return {
      mensaje: `Producto eliminado correctamente con el id: ${id}`,
      data: result,
    };
  }
}
