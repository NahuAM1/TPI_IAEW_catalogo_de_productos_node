import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PRODUCT')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  stock: number;

  @Column()
  availability: string;

  @Column()
  category: string;
}

// ID (UUID, string)
// Nombre (string, máximo 200 caracteres)
// Descripción (string, máximo 500 caracteres)
// Precio (decimal, positivo)
// Stock (entero, mínimo 0)
// Disponibilidad (string, valores posibles: "disponible", "agotado")
// Categoría (string, valores posibles: "electrónica", "hogar", "moda", etc.)
