import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('pedidos.creados')
  async handleOrderCreated(order: any) {
    const { id, productos } = order;
    const productsToReserve = [];

    for (const item of productos) {
      const product = await this.productService.getProductById(item.productoId);
      if (product && product.stock >= item.cantidad) {
        // If there is enough stock, mark as reserved and update the product
        const updatedProduct = await this.productService.updateProduct(product.id, {
          disponibilidad: 'reservado', 
          //stock: product.stock - item.cantidad, // Reduce stock by the quantity
        });

        productsToReserve.push({
          productoId: updatedProduct.id,
          cantidad: item.cantidad,
          estado: 'reservado', // Assuming you have a state for reserved products
        });

        console.log(`Product ${updatedProduct.name} reserved. Remaining stock: ${updatedProduct.stock}`);
      } else {
        // If not enough stock, you might want to notify failure
        console.log(`No enough stock for product: ${product?.name || item.productoId}`);
      }
    }

    if (productsToReserve.length > 0) {
      // Do something to reserve stock or notify the success of the operation
      // Maybe send a confirmation message to another queue, such as 'pedidos.confirmados'
      console.log('Products reserved:', productsToReserve);
    } else {
      // If no product can be reserved, send a cancellation message or log the issue
      console.log('Failed to reserve any products.');
    }
  }
}