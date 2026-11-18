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
import { toast } from "@/components/ui/toast";

import { authClient } from "@/lib/auth-client";
import { Check, Mail, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
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

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      email: string;
      name: string;
      password: string;
      image: string;
    };

    const { data, error } = await authClient.signUp.email(userData);

    if (data?.token) {
      console.log("test");
      toast.add({
        title: "Event created",
        description: "Sunday, December 3 at 9:00 AM",
      });
      console.log("test2");
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-md">
      <Card className="">
        <CardHeader>
          <CardTitle>Create Your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <FieldGroup>
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
                <FieldLabel htmlFor="name">Photo URL</FieldLabel>
                <Input
                  id="name"
                  type="url"
                  name="image"
                  placeholder="https://example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FieldDescription className="[&>span]:flex [&>span]:items-center  [&>span]:gap-2">
                  {requirements.map((item, index) => (
                    <span key={index} className="flex items-center gap-2">
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

              <FieldGroup>
                <Field>
                  <Button
                    disabled={!isPasswordValid}
                    type="submit"
                    className={
                      "bg-orange-400 hover:bg-orange-600 cursor-pointer"
                    }
                  >
                    Register
                  </Button>
                  <Button variant="outline" type="submit">
                    Register with Google
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link href="/login">Login</Link>
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

export default RegistrationForm;
