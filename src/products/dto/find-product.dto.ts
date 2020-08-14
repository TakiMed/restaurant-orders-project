import { ProductCategory } from './../enums/product.category.enum';
import { IsIn } from 'class-validator';
export class FilterByCategoryDto {
    
    @IsIn([ProductCategory.MIXED, ProductCategory.VEGAN, ProductCategory.VEGAN])
    category: ProductCategory;

}