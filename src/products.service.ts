import { Injectable, Inject } from '@nestjs/common';
import { Product } from './Model/Product.model';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productModel: typeof Product,
  ) {}

  async getall(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getOne(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  async create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  async edit(product: Product): Promise<[number]> {
    const data = this.productModel.update(product, {
      where: { id: product.id },
    });
    return data;
  }

  async deleteProd(id: number) {
    const prod: Product = await this.getOne(id);
    prod.destroy();
  }
}
