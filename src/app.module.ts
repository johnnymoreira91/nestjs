import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { productsProviders } from './Model/product.providers';
import { ProductService } from './products.service';
import { ProductsController } from './produtos.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductService, ...productsProviders],
})
export class AppModule {}
