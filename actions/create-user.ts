"use server";
import { SignupType } from "@/schemas/auth-schema";
import { SignupResponse } from "@/types/auth";
import { API_BASE_URL } from "@/types";

export async function createUser(values: SignupType) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data: SignupResponse = await response.json();

    if (!response.ok && !data.success) {
      return {
        success: false,
        message: data.message,
        errors: data.errors,
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
