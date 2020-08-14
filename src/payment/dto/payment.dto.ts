import { PayBy } from '../enum/payment.enum' 
import { IsIn, IsNumber, IsBoolean } from 'class-validator';

export  class PaymentDto {
    @IsIn([PayBy.CARD, PayBy.CASH])
    payby: PayBy;

    cardDetails: string;
    
    @IsNumber()
    totalAmount: number;

    @IsBoolean()
    paymentStatus: boolean;
}