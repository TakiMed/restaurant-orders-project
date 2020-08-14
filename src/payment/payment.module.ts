import { OrdersModule } from './../orders/orders.module';
import { OrderSchema } from './../orders/entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSchema } from './entities/payment.entity';

@Module({
  imports: 
    [MongooseModule.forFeature([
      { name: 'Payment', schema: PaymentSchema},
    ]),
  ],
    providers: [PaymentService],
    exports: [
      PaymentService,
      PaymentModule
    ]
})
export class PaymentModule {

}
