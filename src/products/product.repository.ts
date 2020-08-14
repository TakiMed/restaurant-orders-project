
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from './entities/product.entity';
import { DatabaseRepository } from './../database/database.repository';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { FilterByCategoryDto } from './dto/find-product.dto';


@Injectable()
export class ProductRepository{

    constructor (
        private readonly databaseRepo: DatabaseRepository,
        @InjectModel('Product')
        private readonly productModel: Model<IProduct>
    ){}

    async create(createProductDto: CreateProductDto): Promise<IProduct> {
        return this.databaseRepo.create(createProductDto, this.productModel);
    }

    async findAll(): Promise<IProduct[]>{
        return this.databaseRepo.findAll(this.productModel);
    }

    async findById(id: Schema.Types.ObjectId): Promise<IProduct>{
        return this.databaseRepo.findById(id, this.productModel);
    }

    async findByCategory(query:object): Promise<IProduct[] | null>{
        return this.databaseRepo.findByQuery(query, this.productModel);
    }

    async delete(id: Schema.Types.ObjectId): Promise<IProduct>{
        return this.databaseRepo.delete(id, this.productModel);
    }
}