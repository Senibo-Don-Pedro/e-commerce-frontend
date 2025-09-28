export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  errors?: string[] | null;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4403/api/v1";

export const API_IP = process.env.NEXT_PUBLIC_API_IP || "http://localhost:4403";
