import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Prodcucts } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdcuctImage } from './entities/age.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Prodcucts,ProdcuctImage])],
})
export class ProductsModule {}
