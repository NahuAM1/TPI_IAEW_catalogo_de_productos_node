import { IsInt, IsNumber, IsPositive, IsString } from '@nestjs/class-validator';

export class CreateProductDTO {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @IsInt()
  stock: number;

  @IsString()
  disponibilidad: string;

  @IsString()
  categoria: string;
}
