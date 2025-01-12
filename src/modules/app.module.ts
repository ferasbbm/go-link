import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksModule } from './links/links.module';
import { UserModule } from './users/users.module';
import { ConfigurationModule } from 'src/config/config.module';

@Module({
  imports: [
    ConfigurationModule,
    LinksModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'aswd',
      database: 'go_link',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
