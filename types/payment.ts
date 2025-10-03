import { ApiResponse } from ".";

// This is the shape of the data object inside a successful payment initialization response.
export type PaymentInitializationData = {
  authorizationUrl: string;
};

// This is the full shape of the API response for this specific endpoint.
export type PaymentInitializationResponse = ApiResponse<PaymentInitializationData>;