import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('app.port');
  }

  get baseUrl(): string {
    return this.configService.get<string>('app.baseUrl');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('jwt.secret');
  }

  get databaseHost(): string {
    return this.configService.get<string>('database.host');
  }
}
