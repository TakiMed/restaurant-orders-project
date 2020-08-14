import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type';
import { OrderCategory } from '../enums/order-category';
import { PayBy } from 'src/payment/enum/payment.enum';

export interface IOrder extends Document {
    _id: Schema.Types.ObjectId;
    count: number; //broj proizvoda
    totalAmount: number; //ukupna cijena
    status: OrderStatus; // preparation, ready, taken
    type: OrderType; //here , to go
    dateCreated: Date; //date.now()
    notes: string; //alergies
    products: [Schema.Types.ObjectId]; //products array
    friends: [Schema.Types.ObjectId]; //costumers array
    category: OrderCategory;
    payBy: PayBy;  //payment
    cardDetails: string;
    paymentStatus: boolean;
}

export const OrderSchema: Schema = new Schema({
    name: String,
    surname: String,
    count: Number,
    totalAmount:{ type: Number, default: 0},
    status: { type: OrderStatus, default: OrderStatus.PREPARING },
    type: { type: OrderType, default: OrderType.HERE },
    dateCreated: { type: Date, default: Date.now },
    notes: String,
    products: [{ type: Schema.Types.ObjectId, ref:'Product' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'Costumer', default: null }],
    category: { type: OrderCategory, default: OrderCategory.MIXED },
    payBy: { type: PayBy, default: PayBy.CASH },  //payment
    cardDetails: { type: String, default:'' },
    paymentStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', OrderSchema);