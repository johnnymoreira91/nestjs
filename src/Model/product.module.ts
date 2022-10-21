import { Module } from '@nestjs/common';
import { ProductsController } from 'src/produtos.controller';
import { ProductService } from 'src/products.service';
import { productsProviders } from './product.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductService, ...productsProviders],
})
export class CatsModule {}
