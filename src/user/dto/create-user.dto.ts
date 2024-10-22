import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(16)
  age: number;
}
