import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const ProfileUpdate = () => {
   return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>
          Enter your information below to update your profile
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
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              
            </Field>
            <Field>
              <FieldLabel htmlFor="number">Phone</FieldLabel>
              <Input
                id="number"
                type="number"
                placeholder="8801723456780"
                required
              />
              
            </Field>
            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/image"
                required
              />
              
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Delivary Address</FieldLabel>
              <Input
                id="address"
                type="text"
                placeholder="Bagehat Morrelgang Fulhata Panchakarn"
                required
              />
              
            </Field>
            
            
            <FieldGroup>
              <Field>
                <Button type="submit">Save and Change</Button>
               
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
};

export default ProfileUpdate;