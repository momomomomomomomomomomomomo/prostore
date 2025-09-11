"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    message: "",
    success: false,
  });
  const [userName, setUserName] = useState<string>(signUpDefaultValues.name);
  const [userEmail, setUserEmail] = useState<string>(signUpDefaultValues.email);
  const [userPassword, setUserPassword] = useState<string>(
    signUpDefaultValues.password
  );
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>(
    signUpDefaultValues.confirmPassword
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            autoComplete="current-password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            required
            type="password"
            value={userConfirmPassword}
            onChange={(e) => {
              setUserConfirmPassword(e.target.value);
            }}
            autoComplete="current-password"
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {!data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            target="_self"
            className="link"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
