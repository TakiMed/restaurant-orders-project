import { OrderStatus } from './../enums/order-status.enum';
import { Schema } from 'mongoose';
import { IsIn, IsNumber, IsDate } from 'class-validator';
export class FilterOrderDto{
    _id: Schema.Types.ObjectId;

    @IsNumber()
    totalAmount: number;

    @IsDate()
    dateCreated: Date;

    @IsIn([OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.TAKEN])
    status: OrderStatus;
}