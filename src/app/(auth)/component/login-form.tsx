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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

import { Mail } from "lucide-react";
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

    // if (data) {
    //   await authClient.getSession();

    //   router.replace("/");
    // }
  };

  return (
    <div className="w-md">
      <Card className="">
        <CardHeader>
          <CardTitle className="">Welcome Back!</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@mail.com"
                    className="pl-9"
                    required
                  />
                </div>

                <FieldDescription>
                  We&apos;ll use this to contact you.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" placeholder="••••••••••" required />
              </Field>

              <FieldGroup>
                <Field>
                  <Button
                    type="submit"
                    className={
                      "bg-orange-400 hover:bg-orange-600 cursor-pointer"
                    }
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="size-4" /> Login
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  
                    <LoginWithGoogle/>
                  <FieldDescription className="px-6 text-center">
                    Already have an account?{" "}
                    <Link href="/register">Register</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
