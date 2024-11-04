import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product';
import { CreateProductDTO } from './DTOs/createProduct.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'This endpoint allows to get all Products.',
  })
  @ApiResponse({
    status: 200,
    description: 'All products avaliable.',
  })
  @Get()
  public async getProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @ApiOperation({
    summary: 'This endpoint allows to get a Product with ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'All products avaliable.',
  })
  @ApiParam({
    name: 'The product id.',
  })
  @Get(':id')
  public async getProduct(@Param('id') productId: string): Promise<Product> {
    return await this.productService.getProductById(productId);
  }

  @ApiOperation({
    summary: 'This endpoint allows to create a Product.',
  })
  @ApiResponse({
    status: 201,
    description: 'Product has been created.',
  })
  @ApiBody({
    description: 'The DTO of the new Product Data.',
    type: CreateProductDTO,
  })
  @Post()
  public async createProduct(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDTO);
  }
}
