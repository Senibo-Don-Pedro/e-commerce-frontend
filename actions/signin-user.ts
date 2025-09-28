"use server";
import { SigninType } from "@/schemas/auth-schema";
import { SigninResponse } from "@/types/auth";
import { API_BASE_URL } from "@/types";

export async function signIn(values: SigninType) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data: SigninResponse = await response.json();

    console.log(data);

    if (!response.ok) {

      return {
        success: data.success,
        message: data.message,
        errors: data.errors || null,
      };
    }

    return data;
    
  } catch (error) {
    console.error("Error creating user", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
