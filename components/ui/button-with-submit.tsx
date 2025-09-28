"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

// 1. Import the original Button and its variants configuration
import { Button, buttonVariants } from "./button";

// 2. We build our own props type by combining the original button's props
//    with the CVA variants and our own custom props.
type SubmittableButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isSubmitting?: boolean;
  };

export default function SubmittableButton({
  children,
  isSubmitting,
  className,
  variant, // We can now correctly accept `variant`
  size, // and `size`
  ...props // All other native button props are collected here
}: SubmittableButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      // We pass the variant and size props down to the Button component
      // so it can apply the correct styles from CVA.
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isSubmitting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
