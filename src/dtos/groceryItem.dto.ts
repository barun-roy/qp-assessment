import { IsString, IsNumber, IsNotEmpty, Min } from "class-validator";

export class CreateGroceryItemDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  quantity!: number;
}

export class UpdateGroceryItemDto {

  @IsNumber()
  grocery_id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;
}

export class UpdateQuantityDto {
  @IsNumber()
  @Min(0)
  quantity!: number;
}
