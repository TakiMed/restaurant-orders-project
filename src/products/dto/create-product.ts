import { ProductCategory } from './../enums/product.category.enum';
import { IsString, IsNumber, IsIn, Length, Min } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";



export class CreateProduct{
    @IsString()
    @ApiProperty({ type: String, description: 'Enter product title'})
    title: string;
    
    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, description: 'Enter products price'})
    price: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, description: 'Enter quantity'})
    quantity: number;

    @IsIn([ProductCategory.VEGAN, ProductCategory.VEGETERIAN, ProductCategory.MIXED])
    @ApiProperty({ enum: ProductCategory, description: 'VEGAN/VEGETERIAN/MIXED'})
    category: ProductCategory;
    
    @IsString()
    @ApiProperty({ type: String, description: 'Product content' })
    content: string;

    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, description: 'Enter energie value in ckal'})
    calories: number;

}