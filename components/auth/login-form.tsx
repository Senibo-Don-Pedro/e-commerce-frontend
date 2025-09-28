import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubmittableButton from "../ui/button-with-submit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../ui/password-input";
import FormError from "./form-error";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { SigninSchema, SigninType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { signIn } from "@/actions/signin-user";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation"; // Import the router
import Link from "next/link";
import { API_BASE_URL, API_IP } from "@/types";

type FormErrorState = {
  message?: string;
  errors?: string[] | null;
} | null;

type LoginFormProps = {
  // A function passed from the parent to switch to the sign-up view
  onToggleView: () => void;
};

export function LoginForm({ onToggleView }: LoginFormProps) {
  const [error, setError] = useState<FormErrorState>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Get the login action from the store
  const { login: loginToStore } = useAuthStore();

  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: SigninType) {
    setError(null);

    startTransition(() => {
      signIn(values).then((data) => {
        if (data.success && data.data) {
          //On success, call the store's login action with the user data and token
          loginToStore(data.data, data.data.accessToken);

          toast.success("Login successful! Redirecting...");

          // 4. Redirect the user to the products page
          router.push("/products");
        } else {
          setError({
            message: data.message,
            errors: data.errors || null,
          });
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to access your account.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="test@example.com or testuser123"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="••••••••"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error?.message} errors={error?.errors} />

          <SubmittableButton
            isSubmitting={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Login
          </SubmittableButton>

          {/* --- THIS IS THE KEY PART --- */}
          {/* The button is an `<a>` tag that links directly to your Spring Boot server */}
          <Button
            type="button"
            asChild
            variant="outline"
            className="w-full"
            disabled={isPending}
          >
            <a href={`${API_IP}/oauth2/authorization/google`}>
              <FcGoogle className="mr-2 h-5 w-5" />
              Log in with Google
            </a>
          </Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant={"link"}
            type="button"
            onClick={onToggleView}
            className=" underline text-blue-600"
          >
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
}
