import { Schema } from 'mongoose';
import { FilterOrderDto } from './dto/filter-order-dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { Injectable } from '@nestjs/common';
import { IOrder } from './entities/order.entity';
import { DateFilter } from './enums/date-filer.enum';
import { PaginationDto } from './dto/pagination.dto';
import { IProduct } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly orderRepo: OrderRepository){}

    async create(createOrderDto: CreateOrderDto): Promise<IOrder>{
        return await this.orderRepo.create(createOrderDto);
    }
    
    async findAll(paginationDto: PaginationDto): Promise<IOrder[]> {
        return await this.orderRepo.findAll(paginationDto);
    }

    async findByQuery(filterDto: FilterOrderDto): Promise<IOrder[] | null>{
        if (filterDto.dateCreated){
            return this.orderRepo.findByDate(filterDto.dateCreated);
        }
        return await this.orderRepo.findByQuery(filterDto);
    }

    async dateFilter(dateFilter: DateFilter){
        const today = new Date().setHours(0,0,0,0);
        if(dateFilter === 'TODAY'){
            const t  = new Date().setTime(today);
            return await this.orderRepo.findByDate(t);
        }
        else {
            const m = new Date(new Date(today).getFullYear(), new Date(today).getMonth(), 1);
            return await this.orderRepo.findByDate(m);
        }
    }

    async addProducts(id: Schema.Types.ObjectId, prodId: Schema.Types.ObjectId): Promise<IOrder>{
        return this.orderRepo.addProducts(id, prodId)
    }

    async removeProducts(id: Schema.Types.ObjectId, prodId: Schema.Types.ObjectId): Promise<IOrder>{
        return this.orderRepo.removeProducts(id, prodId);

    }

    async update(id: Schema.Types.ObjectId, updateDto: CreateOrderDto): Promise<IOrder>{
        return this.orderRepo.update(id, updateDto);
    }

    async changePaymentStatus(id: Schema.Types.ObjectId, bool: Boolean): Promise<IOrder>{
        return this.orderRepo.changePaymentStatus(id, bool);
    }
    
    async delete(id: Schema.Types.ObjectId): Promise<IOrder>{
        return this.orderRepo.delete(id);
    }

}
