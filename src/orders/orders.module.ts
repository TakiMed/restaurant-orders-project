import { CostumersModule } from './../costumers/costumers.module';
import { ProductRepository } from './../products/product.repository';
import { DatabaseRepository } from './../database/database.repository';
import { OrderRepository } from './order.repository';
import { CostumerSchema } from './../costumers/entities/costumer.entity';
import { ProductSchema } from './../products/entities/product.entity';
import { OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from 'src/products/products.module';
import { CostumerRepository } from 'src/costumers/costumer.repository';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentSchema } from 'src/payment/entities/payment.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Costumer', schema: CostumerSchema},
      { name: 'Payment', schema: PaymentSchema }
  ]),
    DatabaseModule,
    ProductsModule,
    CostumersModule,
    PaymentModule
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    DatabaseRepository,
    ProductRepository,
    CostumerRepository,
    PaymentService
  ]
})
export class OrdersModule {}
