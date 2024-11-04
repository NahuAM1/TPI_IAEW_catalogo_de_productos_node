import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

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
