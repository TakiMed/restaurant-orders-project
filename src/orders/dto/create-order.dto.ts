import { CreateOrder } from './create-order';
import { Schema } from 'mongoose';
import { OrderType } from "../enums/order-type";
import { OrderCategory } from '../enums/order-category';
import { PayBy } from 'src/payment/enum/payment.enum';


export class CreateOrderDto {
    name: string;
    surname: string;
    // count: number; //broj proizvoda
    totalAmount: number; //ukupna cijena
    // status: OrderStatus; // preparation, ready, taken
    type: OrderType; //here , to go
    dateCreated: Date; //date.now()
    notes: string; //alergies
    products: [Schema.Types.ObjectId] | null; //products array
    friends: [Schema.Types.ObjectId] | null; //costumers array
    category: OrderCategory;
    payBy: PayBy;
    cardDetails: string;
    paymentStatus: boolean; // t/f

    constructor (createOrder: CreateOrder){
        this.name = createOrder.name;
        this.surname = createOrder.surname;
        this.totalAmount = 0;
        this.type = createOrder.type;
        this.dateCreated = createOrder.dateCreated;
        this.notes = createOrder.notes;
        this.friends = createOrder.friends;
        this.category = createOrder.category;
        this.payBy = createOrder.payBy;
        this.cardDetails = createOrder.cardDetails;
        this.paymentStatus = false;
    }
}