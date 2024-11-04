import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product';
import { CreateProductDTO } from './DTOs/createProduct.dto';

@Controller('productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  public async getProduct(@Param('id') productId: string): Promise<Product> {
    return await this.productService.getProductById(productId);
  }

  @Post()
  public async createProduct(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDTO);
  }
}
