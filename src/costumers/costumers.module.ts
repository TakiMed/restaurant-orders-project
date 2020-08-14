import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CostumersController } from './costumers.controller';
import { CostumersService } from './costumers.service';
import { CostumerSchema } from './entities/costumer.entity';
import { DatabaseModule } from 'src/database/database.module';
import { CostumerRepository } from './costumer.repository';
import { DatabaseRepository } from 'src/database/database.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Costumer', schema: CostumerSchema}]),
    DatabaseModule
  ],
  controllers: [CostumersController],
  providers: [
    CostumersService,
    CostumerRepository,
    DatabaseRepository
  ],
})
export class CostumersModule {}
