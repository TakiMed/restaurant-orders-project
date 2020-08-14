import { ProductCategory } from "../enums/product.category.enum";
import { CreateProduct } from "./create-product";

export class CreateProductDto{
    title: string;
    price: number;
    quantity: number;
    category: ProductCategory;
    content: string;
    calories: number;

    constructor (createProduct: CreateProduct){
        this.title = createProduct.title;
        this.price = createProduct.price;
        this.quantity = createProduct.quantity;
        this.category = createProduct.category;
        this.content = createProduct.content;
        this.calories = createProduct.calories;
    }
}