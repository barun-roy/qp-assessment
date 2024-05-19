import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsArray,
  ValidateNested,
} from "class-validator";

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
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;
}

export class UpdateQuantityDto {
  @IsNumber()
  grocery_id!: number;

  @IsNumber()
  @Min(0)
  quantity!: number;
}

class BookGroceryDto {
  @IsNumber()
  grocery_id!: number;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class BookingDto {
  @IsArray()
  items!: BookGroceryDto[];
}
