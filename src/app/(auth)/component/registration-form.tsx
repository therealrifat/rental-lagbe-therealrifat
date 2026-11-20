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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { signUp } from "@/lib/auth-client";

import { Check, LockKeyhole, Mail, X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import LoginWithGoogle from "./login-google";

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Must have an Uppercase",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Must have a Lowercase",
      valid: /[a-z]/.test(password),
    },
  ];

  const isPasswordValid = requirements.every((item) => item.valid);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      email: string;
      name: string;
      password: string;
      image: string;
    };

    const { data, error } = await signUp.email(userData);
    if (error) {
      toast.add({
        type: "warning",
        description: `${error.message}`,
      });
      setIsLoading(false);
      return;
    }
    if (data?.token) {
      toast.add({
        type: "success",

        description: `Account Registration Sucessfull`,
      });

      setIsLoading(false);

      redirect("/");
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="border-b pb-5">
        <CardTitle className="text-lg">Create your account</CardTitle>
        <CardDescription>
          Enter your information below to get started.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-5">
        <form onSubmit={handleSignUp} className="space-y-4">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>

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
              <FieldDescription>
                We&apos;ll use this to contact you.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="photo-url">Photo URL</FieldLabel>
              <Input
                id="photo-url"
                type="url"
                name="image"
                placeholder="https://example.com"
                required
              />
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <FieldDescription className="space-y-1">
                {requirements.map((item, index) => (
                  <span key={index} className="flex items-center gap-2 text-xs">
                    {item.valid ? (
                      <Check size={15} className="text-green-500" />
                    ) : (
                      <X size={15} className="text-red-500" />
                    )}

                    {item.label}
                  </span>
                ))}
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button
            disabled={!isPasswordValid}
            type="submit"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Spinner className="size-4" /> Register
              </>
            ) : (
              "Register"
            )}
          </Button>

          <FieldSeparator>Or continue with</FieldSeparator>

          <LoginWithGoogle mode="Register" />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
