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
import { Check, Mail } from "lucide-react";
import Link from "next/link";

const RegistrationForm = () => {
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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field>
              
             
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
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
                <Input id="name" type="url" placeholder="https://example.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
                <FieldDescription className="[&>span]:flex [&>span]:items-center  [&>span]:gap-2">
         
                    <span>
                      <Check size={15} /> At least 8 characters.
                    </span>
                    <span>
                      <Check size={15} /> Must have an Uppercase
                    </span>
                    <span>
                      <Check size={15} /> Must have an Lowercase
                    </span>

                </FieldDescription>
              </Field>

              <FieldGroup>
                <Field>
                  <Button type="submit" className={"bg-orange-400 hover:bg-orange-600 cursor-pointer"}>Register</Button>
                  <Button variant="outline" type="button">
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
