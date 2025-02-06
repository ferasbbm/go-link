import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../utils/api-response.util';
import { IApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, IApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // If the response is already formatted, return it as-is
        if (data?.success !== undefined) return data;

        // Handle paginated responses
        if (data?.data && data?.pagination)
          return ApiResponse.success(
            data.message || 'Success',
            context.switchToHttp().getResponse().statusCode,
            data.pagination,
            data.data,
          );

        // Default success response
        return ApiResponse.success(
          data,
          'Success',
          context.switchToHttp().getResponse().statusCode,
        );
      }),
    );
  }
}
