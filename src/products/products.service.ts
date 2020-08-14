import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { IProduct } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { FilterByCategoryDto } from './dto/find-product.dto';

@Injectable()
export class ProductsService {
    constructor (
        private readonly productRepo: ProductRepository,
        @InjectModel('Product')
        private readonly productModel: Model<IProduct>
    ){}

    async create(createProductDto: CreateProductDto): Promise<IProduct>{
        return this.productRepo.create(createProductDto);
    }

    async findAll(): Promise<IProduct[]>{
        return this.productRepo.findAll();
    }

    async findById(id: Schema.Types.ObjectId): Promise<IProduct>{
        return this.productRepo.findById(id);
    }

    async findByCategory(filterDto: FilterByCategoryDto): Promise<IProduct[] | null>{
        return this.productRepo.findByCategory(filterDto);
    }

    async findByTitle(title: string){
        return this.productModel.find({"title": { "$regex" : title, "$options": "i"}})
    }

    async delete(id: Schema.Types.ObjectId): Promise<IProduct>{
        return this.productRepo.delete(id);
    }
}
