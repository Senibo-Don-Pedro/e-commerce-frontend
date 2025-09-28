"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupType } from "@/schemas/auth-schema";
import { createUser } from "@/actions/create-user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import SubmittableButton from "../ui/button-with-submit";
import { FcGoogle } from "react-icons/fc";
import { PasswordInput } from "../ui/password-input";
import { API_IP } from "@/types";

// The shape for our error state, to hold both the message and the details
type FormErrorState = {
  message?: string;
  errors?: string[] | null;
} | null;

type SignUpFormProps = {
  // A function passed from the parent to switch back to the login view
  onToggleView: () => void;
};

export function SignUpForm({ onToggleView }: SignUpFormProps) {
  const [error, setError] = useState<FormErrorState>(null);
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignupType) {
    setError(null);
    setSuccess("");

    startTransition(() => {
      createUser(values).then((data) => {
        if (data.success) {
          // --- THIS IS THE NEW LOGIC ---
          // 1. Set the success message so the user can see it.
          setSuccess(data.message);

          // 2. Set a timer to switch to the login view after 2 seconds.
          setTimeout(() => {
            onToggleView(); // This smoothly switches the view without a page reload.
          }, 2000); // 2000 milliseconds = 2 seconds
        } else {
          setError({ message: data.message, errors: data.errors });
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to get started.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="JohnDoe123"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    {...field}
                    disabled={isPending}
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
        </div>

        <FormError message={error?.message} errors={error?.errors} />
        <FormSuccess message={success} />

        <SubmittableButton
          isSubmitting={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Create Account
        </SubmittableButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

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
            Sign up with Google
          </a>
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button
            variant={"link"}
            type="button"
            onClick={onToggleView}
            className="p-0 h-auto underline text-blue-600"
            disabled={isPending}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
