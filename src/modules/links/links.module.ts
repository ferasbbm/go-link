import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './providers/links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
