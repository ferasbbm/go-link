import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const jwtConfig = (): DynamicModule =>
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<any> => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
    }),
  });

// export const refreshJwtConfig = (): DynamicModule =>
//   JwtModule.registerAsync({
//     imports: [ConfigModule],
//     inject: [ConfigService],
//     useFactory: async (configService: ConfigService) => ({
//       secret: configService.get<string>('JWT_REFRESH_SECRET'),
//       signOptions: {
//         expiresIn: configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
//       },
//     }),
//   });
