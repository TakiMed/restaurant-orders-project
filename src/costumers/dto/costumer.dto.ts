import { ICostumer } from './../entities/costumer.entity';
import { Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { throws } from 'assert';
export class Costumer{
    id: Schema.Types.ObjectId;
    name: string;
    surname: string;
    /*
    orderId: Schema.Types.ObjectId
    */
    constructor(costumerEntity: ICostumer){
        this.id = costumerEntity._id;
        this.name = costumerEntity.name;
        this.surname = costumerEntity.surname;
    }
}