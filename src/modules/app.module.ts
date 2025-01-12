import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { UserModule } from './users/users.module';
import { ConfigurationModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, LinksModule, UserModule],
})
export class AppModule {}
