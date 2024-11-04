import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './DTOs/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAllProducts(): Promise<Product[]> {
    const productsData: Product[] = await this.productRepository.find();

    if (!productsData) throw new NotFoundException('Products Not Found!');

    return productsData;
  }

  public async getProductById(productId: number): Promise<Product> {
    const productData: Product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!productData) throw new NotFoundException('Product Not Found!');

    return productData;
  }

  public async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    return await this.productRepository.save(createProductDTO);
  }
}
