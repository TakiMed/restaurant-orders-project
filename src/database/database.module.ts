import { ConfigService } from '@nestjs/config';
import { ConfigModule} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { DatabaseRepository } from "./database.repository";

@Module({
    imports:[
        MongooseModule.forRootAsync({
            imports: [
              ConfigModule.forRoot({
                envFilePath: '.env',
              }),
            ],
            useFactory: async (configService: ConfigService) => ({
              uri: configService.get<string>('MONGODB_URL'),
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
            }),
            inject: [ConfigService],
          }),
    ],
    exports: [DatabaseModule],
    providers: [DatabaseRepository],
})

export class DatabaseModule {}