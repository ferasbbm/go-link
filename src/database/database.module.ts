import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: databaseConfig().type,
        host: databaseConfig().host,
        port: databaseConfig().port,
        username: databaseConfig().username,
        password: databaseConfig().password,
        database: databaseConfig().database,
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: databaseConfig().autoLoadEntities,
        synchronize: databaseConfig().synchronize,
      }),
    }),
  ],
})
export class DatabaseModule {}
