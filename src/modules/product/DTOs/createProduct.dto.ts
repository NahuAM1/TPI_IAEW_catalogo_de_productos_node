import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AVAILABILITY } from '../../../commons/constants/enums';

export class CreateProductDTO {
  @ApiProperty({
    description: 'Name of the product.',
    example: 'Auriculares Bluetooth.',
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Description of the product.',
    example: 'Auriculares inalámbricos con cancelación de ruido.',
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Price of the product.',
    example: 59.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({
    description: 'Stock of the product.',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  stock: number;

  @ApiProperty({
    description: 'Availability of the product.',
    example: 'disponible',
  })
  @IsNotEmpty()
  @IsEnum(AVAILABILITY)
  disponibilidad: string;

  @ApiProperty({
    description: 'Category of the product.',
    example: 'electrónica.',
  })
  @IsNotEmpty()
  @IsString()
  categoria: string;
}
