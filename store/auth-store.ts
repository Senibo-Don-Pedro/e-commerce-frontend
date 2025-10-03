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

// // 2. Define the shape of the entire auth state, including actions
// type AuthState = {
//   user: User | null;
//   accessToken: string | null;
//   login: (userData: User, token: string) => void;
//   logout: () => void;
//   isAuthenticated: () => boolean;
// };

// 2. Define the shape of the entire auth state, including actions
type AuthState = {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
  
  // Optional: Add role-based helpers
  hasRole: (role: Role) => boolean;
  isAdmin: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      // Action to set the user data after a successful login
      setUser: (userData) => set({ user: userData }),

      // Action to clear the user on logout
      clearUser: () => set({ user: null }),

      // Check if user is authenticated (user exists in store)
      isAuthenticated: () => !!get().user,

      // Check if user has a specific role
      hasRole: (role) => get().user?.role === role,

      // Quick helper to check if user is admin
      isAdmin: () => get().user?.role === "ADMIN",
    }),
    {
      name: "e-commerce-auth-storage", // The key to use in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       accessToken: null,

//       // Action to set the user and token after a successful login
//       login: (userData, token) => set({ user: userData, accessToken: token }),

//       // Action to clear the user and token on logout
//       logout: () => set({ user: null, accessToken: null }),

//       // A helper function to easily check if the user is authenticated
//       isAuthenticated: () => !!get().accessToken,
//     }),
//     {
//       name: "e-commerce-auth-storage", // The key to use in localStorage
//       storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
//     }
//   )
// );
