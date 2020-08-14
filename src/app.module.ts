import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CostumersModule } from './costumers/costumers.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    CostumersModule,
    OrdersModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
