import { IProduct } from './../entities/product.entity';
import { Schema } from 'mongoose'
import { ProductCategory } from '../enums/product.category.enum';
export class Product{
    id: Schema.Types.ObjectId;
    title: string;
    price: number;
    qunatity: number;
    category: ProductCategory;
    content: string;
    calories: number;

    constructor( productEnity: IProduct){
        this.id = productEnity._id;
        this.title = productEnity.title;
        this.price = productEnity.price;
        this.qunatity = productEnity.quantity;
        this.category = productEnity.category;
        this.content = productEnity.content;
        this.calories = productEnity.calories;
    }
}