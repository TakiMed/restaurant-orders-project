import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const swaggerSetup = (app) => {
    const options = new DocumentBuilder()
      .setTitle('ORDERS')
      .setDescription('My Restaurant APP')
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  };

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  swaggerSetup(app);
  
  await app.listen(3000);
}
bootstrap();
