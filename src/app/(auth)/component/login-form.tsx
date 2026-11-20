"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginWithGoogle from "./login-google";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email(userData);
    if (error) {
      toast.add({
        type: "warning",
        description: error?.message
      });
      setIsLoading(false);
      return;
    }
    if (data?.token) {
      toast.add({
       title: "Login successful!",
       description: "Welcome back!",
       type: "success",
      });

      setIsLoading(false);

      router.push("/");
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="border-b pb-5">
        <CardTitle className="text-lg">Sign in</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-5">
        <form onSubmit={handleSignUp} className="space-y-4">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@mail.com"
                  className="pl-9"
                  required
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </Field>
          </FieldGroup>

          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <Spinner className="size-4" /> Login
              </>
            ) : (
              "Login"
            )}
          </Button>

          <FieldSeparator>Or continue with</FieldSeparator>

          <LoginWithGoogle mode="Login" />

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
