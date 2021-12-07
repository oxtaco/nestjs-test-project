import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  CloudWatchLogger,
  configureGRPC,
  AWSClient,
  CustomConfigService,
} from '@repos/common';

async function bootstrap() {
  AWSClient.instantiate();

  const logger = new CloudWatchLogger();

  const options = { cors: true, logger };

  const app = await NestFactory.create(AppModule, options);
  const configuration = app.get(CustomConfigService);
  const port = configuration.get<number>('port');

  await logger.init('dev', 'profile');

  app.setGlobalPrefix(configuration.get<string>('prefix'));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('The Medical Service PROFILE API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const grpcConfig = configureGRPC(
    configuration.get<string>('GRPC.profile'),
    'profile',
  );

  app.connectMicroservice<MicroserviceOptions>(grpcConfig);
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log('Profile service is listening on port ' + port);
  });
}

bootstrap();
