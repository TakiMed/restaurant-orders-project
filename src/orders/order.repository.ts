import { PaginationDto } from './dto/pagination.dto';
import { PaymentService } from './../payment/payment.service';
import { CreateCostumerDto } from './../costumers/dto/create-costumer.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { DatabaseRepository } from 'src/database/database.repository';
import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { IOrder } from './entities/order.entity';
import { Model, Schema } from 'mongoose';
import { IProduct } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/product.repository';
import { CostumerRepository } from 'src/costumers/costumer.repository';
import { Payment } from 'src/payment/entities/payment.entity';

@Injectable()
export class OrderRepository{

    constructor (
        private readonly databaseRepo: DatabaseRepository,
        private readonly costumerRepo: CostumerRepository,
        private readonly productRepo: ProductRepository,
        private readonly paymentService: PaymentService,
        @InjectModel('Order')
        private readonly orderModel: Model<IOrder>,
        @InjectModel('Product')
        private readonly productModel: Model<IProduct>,
        @InjectModel('Payment')
        private readonly paymentModel: Model<Payment>
    ){}

    async create(createOrderDto: CreateOrderDto) : Promise<IOrder>{
        const created = new this.orderModel(createOrderDto);
        // validate products
        if(createOrderDto.products.indexOf("")!=-1){throw new BadRequestException(`You must choose products`)}
        //totalAmount
        const prods = await createOrderDto.products.map((prod) =>{
            prod = this.productRepo.findById(prod)
                .then((res)=> created.totalAmount+=res.price)
        })
        // enter a costumer into array
        const costumer = await this.costumerRepo.create({name: createOrderDto.name, surname: createOrderDto.surname})
        costumer._id = created._id;

        const newPayment = await this.paymentService.create({ 
            payby: createOrderDto.payBy,
            cardDetails: createOrderDto.cardDetails,
            totalAmount: created.totalAmount,
            paymentStatus: createOrderDto.paymentStatus});
        
        newPayment._id = created._id;
        const allPayments = await this.paymentService.findAll();
        return created.save();
    }

    async findAll(paginationDto: PaginationDto): Promise<IOrder[]> {
        if(Object.keys(paginationDto).length > 0){
            const ps = Number(paginationDto.pagesize);
            const pn = Number(paginationDto.pagenum);
            return await this.databaseRepo.findAll(this.orderModel, ps, pn);
        }
        else
            return await this.databaseRepo.findAll(this.orderModel);
    }

    async findById(id: Schema.Types.ObjectId): Promise<IOrder> {
        return this.databaseRepo.findById(id, this.orderModel);
    }

    async findByQuery(query: object ): Promise<IOrder[] | null>{
        return this.databaseRepo.findByQuery(query, this.orderModel );
    }

    async findByDate(date){
        return this.orderModel.find({"dateCreated": {$gte: new Date(date)}});
    }

    async removeProducts(id: Schema.Types.ObjectId, prodId: Schema.Types.ObjectId):Promise<IOrder>{
        const order = await this.findById(id);
        if(order.products.indexOf(prodId)===-1){ throw new BadRequestException(`Product with id ${prodId} not found`)}
        delete order.products[order.products.indexOf(prodId)];
        return this.databaseRepo.update(id, order, this.orderModel);

    }

    async addProducts(id: Schema.Types.ObjectId, prodId: Schema.Types.ObjectId): Promise<IOrder>{
        const order = await this.findById(id);
        order.products.push(prodId);
        return this.databaseRepo.update(id, order, this.orderModel);
    }

    async update(id: Schema.Types.ObjectId, updateDto: CreateOrderDto ): Promise<IOrder> {
        return this.databaseRepo.update(id, updateDto, this.orderModel);
    }

    async changePaymentStatus(id: Schema.Types.ObjectId, bool: Boolean): Promise<IOrder>{
        const existing = await this.databaseRepo.findById(id, this.orderModel);
        const updatedOrder = await this.orderModel.findByIdAndUpdate(
            id,
            {
                paymentStatus: bool
            },
            {
                new: true
            }
        )
        const updatedPayment = await this.paymentModel.findByIdAndUpdate(
            id,
            {
                paymentStatus: bool
            },
            {
                new: true
            }
        )

        return updatedOrder;
    }

    async delete(id: Schema.Types.ObjectId): Promise<IOrder>{
        return this.databaseRepo.delete(id, this.orderModel);
    }

}