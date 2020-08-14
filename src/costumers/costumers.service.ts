import { Schema } from 'mongoose';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { Injectable } from '@nestjs/common';
import { CostumerRepository } from './costumer.repository';
import { ICostumer } from './entities/costumer.entity';

@Injectable()
export class CostumersService {
    
    constructor(
        private readonly costumerRepo: CostumerRepository
    ){}
    
    async create(createCostumerDto: CreateCostumerDto): Promise<ICostumer>{
        return this.costumerRepo.create(createCostumerDto);
    }

    async findAll(): Promise<ICostumer[]>{
        return this.costumerRepo.findAll();
    }

    async findById(id: Schema.Types.ObjectId): Promise<ICostumer>{
        return this.costumerRepo.findById(id);
    }


}
