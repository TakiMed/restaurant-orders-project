import { CreateCostumerDto } from './dto/create-costumer.dto';
import { DatabaseRepository } from './../database/database.repository';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { ICostumer } from './entities/costumer.entity';
import { Model, Schema } from 'mongoose';


@Injectable()
export class CostumerRepository{

    constructor(
        private readonly databaseRepo:DatabaseRepository,
        @InjectModel('Costumer')
        private readonly costumerModel: Model<ICostumer>
    ){}

    async create(createCostumerDto: CreateCostumerDto): Promise<ICostumer>{
        return this.databaseRepo.create(createCostumerDto, this.costumerModel);
    }
    
    async findAll(): Promise<ICostumer[]>{
        return this.databaseRepo.findAll(this.costumerModel);
    }

    async findById(id: Schema.Types.ObjectId): Promise<ICostumer>{
        return this.databaseRepo.findById(id, this.costumerModel);
    }
    
}