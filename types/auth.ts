import { ApiResponse } from ".";

export type SignupResponse = ApiResponse<null>;


export enum Role {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export type UserDetails = {
  id: string;
  accessToken: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: Role;
};

export type SigninResponse = ApiResponse<UserDetails>