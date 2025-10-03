import { UUID } from "crypto";
import { ApiResponse, PaginatedResponse } from ".";

export type OrderItems = {
  productId: UUID;
  productName: string;
  imageUrl: string | null;
  quantity: number;
  pricePerUnit: number;
};

export type Order = {
  orderId: UUID;
  orderDate: string;
  orderStatus: "PENDING" | "PAID" | "SHIPPED" | "CANCELLED";
  totalAmount: number;
  items: OrderItems[];
};

export type OrderResponseParams = {
  page?: number;
  pageSize?: number;
  sortBy?: "createdAt" | "totalAmount" | "orderStatus";
  sortDirection?: "asc" | "desc";
  status?: "PENDING" | "PAID" | "SHIPPED" | "CANCELLED";
};

export type PaginatedOrderResponse = ApiResponse<PaginatedResponse<Order>>;
