import { ProductRepository } from './product.repository';
import { ProductSchema } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseRepository } from 'src/database/database.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[
    MongooseModule.forFeature([
    { name: 'Product', schema: ProductSchema }
    ]),
    DatabaseModule
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    DatabaseRepository,
  ],
  exports:[ProductsModule]
})
export class ProductsModule {}
