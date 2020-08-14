import { PayBy } from './../../payment/enum/payment.enum';
import { OrderCategory } from './../enums/order-category';
import { OrderStatus } from "../enums/order-status.enum";
import { OrderType } from "../enums/order-type";
import { Schema } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, IsNumber, Length} from 'class-validator';

export class CreateOrder {
    @IsString()
    @Length(3,15)
    @ApiProperty({ type: String, description: 'Enter Name'})
    name: string;

    @IsString()
    @Length(3,15)
    @ApiProperty({ type: String, description: 'Enter Surname'})
    surname: string;
    
    // count: number; //broj proizvoda
    totalAmount: number; //ukupna cijena
    // status: OrderStatus; // preparation, ready, taken
    @IsIn([OrderType.HERE, OrderType.TO_GO])
    @ApiProperty({ enum: OrderType, description: 'HERE OR TO GO?'})
    type: OrderType; //here , to go

    dateCreated: Date; //date.now()
    
    @IsString()
    @ApiProperty({type: String, description: 'Alergies or special requirements'})
    notes: string; //alergies
    
    @ApiProperty({ description: 'Add chosen products' })
    products: [Schema.Types.ObjectId] | null; //products array
    
    @ApiProperty({ description: 'Select people with similar taste'})
    friends: [Schema.Types.ObjectId] | null; //costumers array
    
    @IsIn([OrderCategory.VEGAN, OrderCategory.VEGETERIAN, OrderCategory.MIXED])
    @ApiProperty({ enum: OrderCategory, description: 'VEGAN VEGETERIAN OR MIXED'})
    category: OrderCategory;
    
    @IsIn([PayBy.CARD, PayBy.CASH])
    @ApiProperty({ enum: PayBy, description: 'Choose the way you pay' })
    payBy: PayBy; //payment

    @ApiProperty({ description: 'Enter card details'})
    cardDetails:string;
    
    paymentStatus: boolean; // t/f
}