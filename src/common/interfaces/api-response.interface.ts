import { HttpStatus } from '@nestjs/common';

export interface IApiResponse<T> {
  data: T | null;
  status: HttpStatus;
  message: string;
  success: boolean;
  pagination?: {
    total: number;
    perPage: number;
    currentPage: number;
    nextPage?: number;
    prevPage?: number;
  };
}
