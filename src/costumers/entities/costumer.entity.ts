import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface ICostumer extends Document{
    _id: Schema.Types.ObjectId;
    name: string;
    surname: string;
}

export const CostumerSchema: Schema = new Schema({
    name: {type: String, required: true},
    surname: String,
});

module.exports = mongoose.model('Costumer', CostumerSchema);