import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { UserModule } from './users/users.module';
import { ConfigurationModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LinksModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
