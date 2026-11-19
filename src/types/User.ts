import { UserRole } from "./UserRole";

export interface User {
  name: string;
  phone?: string;
  email: string;
  deliveryAddress?: string;
  image?: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  emailVerified: boolean;
}
