import { HttpStatus } from '@nestjs/common';
import { IApiResponse } from '../interfaces/api-response.interface';

export class ApiResponse {
  static success<T>(
    data: T,
    message: string = 'Success!',
    status: number = HttpStatus.OK,
    pagination?: IApiResponse<T>['pagination'],
  ): IApiResponse<T> {
    return {
      status,
      message,
      success: true,
      pagination,
      data,
    };
  }

  static error<T>(
    message: string = 'Error',
    status: number = HttpStatus.BAD_REQUEST,
  ): IApiResponse<T> {
    return {
      data: null,
      status,
      message,
      success: false,
    };
  }
}
