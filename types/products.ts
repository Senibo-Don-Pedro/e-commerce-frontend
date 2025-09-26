import { ApiResponse, PaginatedResponse } from ".";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  imageUrl: string | null;
  sku: string;
};

// 1. Define the categories as a constant array
export const PRODUCT_CATEGORIES = [
  "ELECTRONICS",
  "CLOTHING",
  "HOME_GARDEN",
  "BOOKS_MEDIA",
  "SPORTS_OUTDOORS",
  "HEALTH_BEAUTY",
  "AUTOMOTIVE",
  "TOYS_GAMES",
  "FOOD_BEVERAGES",
  "ACCESSORIES",
  "PET_SUPPLIES",
  "OFFICE_SUPPLIES",
] as const; // `as const` is important here!

// 2. Infer the type from the array
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductResponseParams = {
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortDirection?: "asc" | "desc";
  searchTerm?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
};

export type PaginatedProductsResponse = ApiResponse<PaginatedResponse<Product>>;
