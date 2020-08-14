import { ProductCategory } from '../enums/product.category.enum';
import * as mongoose from 'mongoose';

//may be interface

export interface IProduct extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    title:string;
    price:number;
    quantity:number;
    category:ProductCategory;
    content: string;
    calories: number;
}

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: ProductCategory, required: true },
    content: { type: String, required: true},
    calories: { type: Number, required: true}
});

module.exports = mongoose.model('Product', ProductSchema);
