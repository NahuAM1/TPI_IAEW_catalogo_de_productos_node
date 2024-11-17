import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../entities/product';
import { CreateProductDTO } from './DTOs/createProduct.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductAvailabilityRequest, ProductAvailabilityResponse } from 'src/grpc/product';
import { GrpcMethod } from '@nestjs/microservices';

@ApiTags('Products')
@Controller('productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'This endpoint allows to get all Products.',
  })
  @ApiResponse({
    status: 200,
    description: 'All products available.',
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
    description: 'Product details.',
  })
  @ApiParam({
    name: 'id',
    description: 'The product id.',
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

  @ApiOperation({
    summary: 'This endpoint allows to update a Product with ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product has been updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
  })
  @ApiBody({
    description: 'The DTO of the Product Data to update.',
    type: CreateProductDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'The product id.',
  })
  @Put(':id')
  public async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDTO: CreateProductDTO,
  ): Promise<Product> {
    return await this.productService.updateProduct(productId, updateProductDTO);
  }

  @GrpcMethod('ProductService', 'CheckProductAvailability')
  async checkProductAvailability(data: ProductAvailabilityRequest,): Promise<ProductAvailabilityResponse> {
    return this.productService.checkProductAvailability(data);
  }

}
