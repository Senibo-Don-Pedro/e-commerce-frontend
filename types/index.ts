export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
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

// STEP 3: This is the magic. We create a new, flexible type.
// An ApiResponse can be EITHER a success OR an error.
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;


export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4403/api/v1";
