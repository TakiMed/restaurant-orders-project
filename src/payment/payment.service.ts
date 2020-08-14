import { ProductCategory } from './../products/enums/product.category.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Payment } from './entities/payment.entity';
import { PaymentDto } from './dto/payment.dto';
@Injectable()
export class PaymentService {

    constructor(
        @InjectModel('Payment') private readonly paymentModel: Model<Payment>
    ){}

    async create(payDto: PaymentDto){
        const newPayment = await this.paymentModel.create(payDto);
        return await newPayment.save();
    }

    async findAll(){
        return await this.paymentModel.find();
    }

  //  async findByid(id: Schema.Types.ObjectId): Promise<Payment>{
    //    return await this.paymentModel.findById(id);
    //}
}
