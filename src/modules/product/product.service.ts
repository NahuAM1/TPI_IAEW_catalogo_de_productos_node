import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './DTOs/createProduct.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @Inject('PRODUCT_SERVICE') // Inyecta el cliente RabbitMQ
    private readonly client: ClientProxy,
  ) {}

  public async getAllProducts(): Promise<Product[]> {
    const productsData: Product[] = await this.productRepository.find();

    if (!productsData) throw new NotFoundException('Products Not Found!');

    return productsData;
  }

  public async getProductById(productId: string): Promise<Product> {
    const productData: Product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!productData) throw new NotFoundException('Product Not Found!');

    return productData;
  }

  public async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productRepository.save({
      name: createProductDTO.nombre,
      description: createProductDTO.descripcion,
      price: createProductDTO.precio,
      stock: createProductDTO.stock,
      availability: createProductDTO.disponibilidad,
      category: createProductDTO.categoria,
    });

    return newProduct;
  }

  public async updateProduct(productId: string, updateProductDTO: Partial<CreateProductDTO>): Promise<Product> {
    // Find the product to be updated
    const existingProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
  
    if (!existingProduct) throw new NotFoundException('Product Not Found!');
  
    // Update only the fields provided
    if (updateProductDTO.nombre !== undefined) existingProduct.name = updateProductDTO.nombre;
    if (updateProductDTO.descripcion !== undefined) existingProduct.description = updateProductDTO.descripcion;
    if (updateProductDTO.precio !== undefined) existingProduct.price = updateProductDTO.precio;
    if (updateProductDTO.stock !== undefined) existingProduct.stock = updateProductDTO.stock;
    if (updateProductDTO.disponibilidad !== undefined) existingProduct.availability = updateProductDTO.disponibilidad;
    if (updateProductDTO.categoria !== undefined) existingProduct.category = updateProductDTO.categoria;
  
    // Save the updated product
    const updatedProduct = await this.productRepository.save(existingProduct);
  
    // Publish the message to RabbitMQ after updating a product
    this.client.emit('productos.actualizados', {
      productoId: updatedProduct.id,
      precio: updatedProduct.price,
      disponibilidad: updatedProduct.availability,
    });
  
    return updatedProduct;
  }
  





  
}



