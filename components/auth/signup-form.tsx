import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

// We can reuse the same Google Icon component

type SignUpFormProps = {
  // A function passed from the parent to switch back to the login view
  onToggleView: () => void;
};

export function SignUpForm({ onToggleView }: SignUpFormProps) {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your details below to get started.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" placeholder="John" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" placeholder="Doe" required />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="johndoe123" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Create Account
        </Button>
        <Button variant="outline" className="w-full">
          <FcGoogle />
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button
        variant={"link"}
          type="button"
          onClick={onToggleView}
          className=" underline text-blue-600"
        >
          Login
        </Button>
      </div>
    </form>
  );
}
