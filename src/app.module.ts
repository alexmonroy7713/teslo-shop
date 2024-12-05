import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_NAME ,
      autoLoadEntities: true, // Carga las entidades automáticamente
      synchronize: true, // ¡No uses synchronize en producción!
    }),
    ProductsModule,
    FilesModule,
   ],
 
})
export class AppModule {}
