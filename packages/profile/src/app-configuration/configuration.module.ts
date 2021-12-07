import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envSchema } from './env.validation.schema';
import * as TypeormAsyncConfiguration from './ormconfig';
import { CloudWatchLogger, CustomConfigModule } from '@repos/common';
import config from './config';

@Module({
  imports: [
    CustomConfigModule.forRoot({
      awsParamStorePaths: [process.env.COMMON_PATH, process.env.SERVICE_PATH],
      load: config,
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync(TypeormAsyncConfiguration),
  ],
  providers: [
    {
      provide: CloudWatchLogger,
      useValue: new CloudWatchLogger('dev', 'profile'),
    },
  ],
  exports: [CloudWatchLogger],
})
export class ConfigurationModule {}
