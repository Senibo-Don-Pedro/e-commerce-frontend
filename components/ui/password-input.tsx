"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// We define our props type using the same built-in React utility.
// This gets all the standard attributes of an HTML <input> element.
export type PasswordInputProps = React.ComponentProps<"input">;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => setShowPassword(true);
    const handleHidePassword = () => setShowPassword(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-12", className)} // Add padding for the icon
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent"
          // Mouse events for desktop
          onMouseDown={handleShowPassword}
          onMouseUp={handleHidePassword}
          onMouseLeave={handleHidePassword}
          // Touch events for mobile
          onTouchStart={handleShowPassword}
          onTouchEnd={handleHidePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };