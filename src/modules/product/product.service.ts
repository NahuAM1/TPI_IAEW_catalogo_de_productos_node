import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './DTOs/createProduct.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject('PRODUCTS_SERVICE')
    private readonly rabbitMQCLient: ClientProxy,
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

  public async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const newProduct = this.productRepository.create({
      name: createProductDTO.nombre,
      description: createProductDTO.descripcion,
      price: createProductDTO.precio,
      stock: createProductDTO.stock,
      availability: createProductDTO.disponibilidad,
      category: createProductDTO.categoria,
    });

    const savedProduct = await this.productRepository.save(newProduct);

    this.rabbitMQCLient.emit('productos.actualizados', {
      productoId: savedProduct.id,
      precio: savedProduct.price,
      disponibilidad: savedProduct.availability,
    });

    return savedProduct;
  }

  public async handleOrderCreated(data: any) {
    const { id, productos } = data;

    // Verifica el stock para cada producto en el pedido
    for (const producto of productos) {
      const productData = await this.getProductById(producto.productoId);

      if (productData.stock >= producto.cantidad) {
        // Si hay suficiente stock, "reserva" el stock necesario (sin reducirlo aún)
        console.log(
          `Reservando ${producto.cantidad} de ${productData.name} para el pedido ${id}.`,
        );
      } else {
        // Si no hay suficiente stock, no realiza la reserva
        console.log(
          `No hay suficiente stock para ${productData.name} en el pedido ${id}.`,
        );
      }
    }
  }
}
