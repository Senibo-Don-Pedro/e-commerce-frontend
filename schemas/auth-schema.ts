import { z } from "zod";

export const SignupSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name cannot be longer than 50 characters." }),

  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name cannot be longer than 50 characters." }),

  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(20, { message: "Username cannot be longer than 20 characters." }),

  email: z
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Email is required." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    // You can even add more complex rules with regex
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
});

export const SigninSchema = z.object({
  identifier: z.string().min(1, { message: " Username or Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignupType = z.infer<typeof SignupSchema>;
export type SigninType = z.infer<typeof SigninSchema>;
