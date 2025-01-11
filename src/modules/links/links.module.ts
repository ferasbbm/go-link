import { Module } from '@nestjs/common';
import { LinkController } from './links.controller';
import { LinkService } from './providers/links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinksModule {}
