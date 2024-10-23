import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
  @IsString()
  name: string
  @IsNumber()
  price: number
  @IsString()
  imgUrl: string
  @IsNumber()
  quantity:number
  @IsString()
  description
}
