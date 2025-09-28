import { Role } from "@/types/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Define the shape of the user data we want to store
export type User = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: Role;
};

// 2. Define the shape of the entire auth state, including actions
type AuthState = {
  user: User | null;
  accessToken: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      // Action to set the user and token after a successful login
      login: (userData, token) => set({ user: userData, accessToken: token }),

      // Action to clear the user and token on logout
      logout: () => set({ user: null, accessToken: null }),

      // A helper function to easily check if the user is authenticated
      isAuthenticated: () => !!get().accessToken,
    }),
    {
      name: "e-commerce-auth-storage", // The key to use in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);
