import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from '@nestjs/class-validator';
import { AVAILABILITY } from 'src/commons/constants/enums';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsEnum(AVAILABILITY)
  disponibilidad: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;
}
