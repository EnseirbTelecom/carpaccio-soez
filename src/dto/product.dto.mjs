import { IsPositive, Min, IsInt } from 'class-validator'
import {Type} from 'class-transformer'

export class ProductDTO{
  @Type(() => Number)
  @IsPositive({each:true})
  prices;

  @Type(() => Number)
  @IsInt()
  @Min(1,{each:true})
  quantities;
}