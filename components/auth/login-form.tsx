import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

// A simple inline SVG for the Google icon
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.9 2.25-5.47 2.25-4.81 0-8.73-3.88-8.73-8.73s3.92-8.73 8.73-8.73c2.57 0 4.5 1.08 5.52 2.05l-2.6 2.6c-.49-.46-1.4-1.08-2.92-1.08-3.26 0-5.9 2.66-5.9 5.91s2.63 5.91 5.9 5.91c3.83 0 5.24-2.85 5.5-4.22h-5.51v-3.28h7.84c.12.45.18.9.18 1.48 0 2.25-.6 4.6-2.25 6.35-1.73 1.73-3.92 2.66-6.35 2.66-5.52 0-10-4.48-10-10s4.48-10 10-10c3.05 0 5.25 1.24 6.9 2.85l-2.4 2.4c-1.18-1.08-2.8-1.8-4.5-1.8Z"
    />
  </svg>
);

type LoginFormProps = {
  // A function passed from the parent to switch to the sign-up view
  onToggleView: () => void;
};

export function LoginForm({ onToggleView }: LoginFormProps) {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to access your account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="identifier">Email or Username</Label>
          <Input
            id="identifier"
            type="text"
            placeholder="johndoe123"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          <FcGoogle />
          Login with Google
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
  );
}
