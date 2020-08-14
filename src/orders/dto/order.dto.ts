import { IOrder } from './../entities/order.entity';
import { OrderCategory } from './../enums/order-category';
import { Schema } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type';
import { PayBy } from 'src/payment/enum/payment.enum';

export class Order{

    id: Schema.Types.ObjectId;

    count: number; //broj proizvoda

    totalAmount: number; //ukupna cijena

    status: OrderStatus; // preparation, ready, taken

    type: OrderType; //here , to go
   
    dateCreated: Date; //date.now()

    notes: string; //alergies

    products: [Schema.Types.ObjectId] | null; //products array
  
    friends: [Schema.Types.ObjectId] | null; //costumers array

    category: OrderCategory;
    
    payBy: PayBy;  //payment
    
    cardDetails: string;

    paymentStatus: boolean;

    constructor (order: IOrder){
        this.id = order._id;
        this.count = order.products.length;
        this.totalAmount = order.totalAmount;
        this.status = order.status;
        this.type = order.type;
        this.dateCreated = order.dateCreated;
        this.notes = order.notes;
        this.products = order.products;
        this.friends = order.friends;
        this.category = order.category;
        this.payBy = order.payBy;
        this.cardDetails = order.cardDetails;
        this.paymentStatus = order.paymentStatus
    }
}