import { Document, Schema } from 'mongoose';
import { PayBy } from '../enum/payment.enum';
import * as mongoose from 'mongoose';

export class Payment extends Document {
    _id: Schema.Types.ObjectId;
    payby: PayBy;
    cardDetails: string;
    paymentStatus: boolean;
    totalAmount: number;
}

export const PaymentSchema = new Schema ({
    payby: { type: PayBy },
    cardDetails: {type: String, default: ''},
    paymentStatus: {type: Boolean, default: false },
    totalAmount: Number,
});

module.exports = mongoose.model('Payment', PaymentSchema);
