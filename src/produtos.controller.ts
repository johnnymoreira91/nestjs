import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './Model/Product.model';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getall();
  }

  @Get(':id')
  async getOne(@Param() params: Product): Promise<Product> {
    return this.productService.getOne(params.id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put()
  async edit(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Delete(':id')
  async del(@Param() params: { id: number }): Promise<string> {
    await this.productService.deleteProd(params.id);
    return 'deleted product';
  }
}
