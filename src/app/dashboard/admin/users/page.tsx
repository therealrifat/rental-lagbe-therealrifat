import { UserCog } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/types/UserRole";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  deliveryAddress?: string;
  phone?: string;
};

const dummyUsers: AdminUser[] = [
  {
    _id: "6b01453ada6ba21cfa1ccbe6",
    name: "Rifat Islam",
    email: "realrifatislam@gmail.com",
    emailVerified: true,
    image: "https://i.ibb.co/sDG2yxh/admin.jpg",
    createdAt: "2026-11-21T07:16:10.172Z",
    updatedAt: "2026-11-21T07:16:10.172Z",
    role: "customer",
    deliveryAddress: "Bagen",
    phone: "01719225536",
  },
  {
    _id: "6b01453ada6ba21cfa1ccbe7",
    name: "Sadia Karim",
    email: "sadia.karim@example.com",
    emailVerified: true,
    createdAt: "2026-11-18T10:24:00.000Z",
    updatedAt: "2026-11-20T12:10:00.000Z",
    role: "owner",
    deliveryAddress: "Dhaka, Gulshan",
    phone: "01812345678",
  },
  {
    _id: "6b01453ada6ba21cfa1ccbe8",
    name: "Ahmed Rahman",
    email: "ahmed.rahman@example.com",
    emailVerified: false,
    createdAt: "2026-11-14T05:45:00.000Z",
    updatedAt: "2026-11-14T05:45:00.000Z",
    role: "customer",
    deliveryAddress: "Chittagong, Agrabad",
    phone: "01987654321",
  },
  {
    _id: "6b01453ada6ba21cfa1ccbe9",
    name: "Nurul Amin",
    email: "nurul.amin@example.com",
    emailVerified: true,
    createdAt: "2026-11-09T14:05:00.000Z",
    updatedAt: "2026-11-11T09:30:00.000Z",
    role: "owner",
    deliveryAddress: "Rajshahi, Boalia",
    phone: "01655554444",
  },
  {
    _id: "6b01453ada6ba21cfa1ccbea",
    name: "Farah Naz",
    email: "farah.naz@example.com",
    emailVerified: true,
    createdAt: "2026-11-02T08:50:00.000Z",
    updatedAt: "2026-11-19T11:15:00.000Z",
    role: "admin",
    deliveryAddress: "Dhaka, Uttara",
    phone: "01544443333",
  },
  {
    _id: "6b01453ada6ba21cfa1ccbeb",
    name: "Md. Tanvir Hasan",
    email: "tanvir.hasan@example.com",
    emailVerified: false,
    createdAt: "2026-10-27T16:20:00.000Z",
    updatedAt: "2026-10-27T16:20:00.000Z",
    role: "customer",
    deliveryAddress: "Gazipur, Tongi",
    phone: "01711112222",
  },
];

const roleOptions = [
  { label: "Customer", value: "customer" },
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
];

const roleStyles: Record<UserRole, string> = {
  customer: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  owner: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  admin: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

const formatDate = (value: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const RoleBadge = ({ role }: { role: UserRole }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
      roleStyles[role] ?? "bg-muted text-muted-foreground"
    }`}
  >
    {role}
  </span>
);

const UserIdentity = ({ user }: { user: AdminUser }) => (
  <div className="flex items-center gap-3">
    <Avatar>
      {user.image && <AvatarImage src={user.image} alt={user.name} />}
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
    <div className="min-w-0 space-y-0.5">
      <p className="truncate font-medium">{user.name}</p>
      <p className="truncate text-xs text-muted-foreground">{user.phone || "—"}</p>
    </div>
  </div>
);

const RoleSelect = ({ role }: { role: UserRole }) => (
  <Select items={roleOptions} defaultValue={role}>
    <SelectTrigger className="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Change Role</SelectLabel>
        {roleOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

const ManageButton = () => (
  <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto">
    <UserCog className="size-4" />
    Manage Users
  </Button>
);

const EmptyState = () => (
  <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
    No registered users yet.
  </div>
);

const AllUsers = () => {
  const users = dummyUsers;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-5 space-y-1 sm:mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">All Users</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          View registered users and manage their account roles.
        </p>
      </div>

      {users.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mobile & tablet */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {users.map((user) => (
              <article
                key={user._id}
                className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <UserIdentity user={user} />
                  <RoleBadge role={user.role} />
                </div>

                <dl className="mt-4 grid gap-3 text-xs sm:text-sm">
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="mt-0.5 break-all font-medium">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Registration Date</dt>
                    <dd className="mt-0.5 font-medium">{formatDate(user.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Change Role</dt>
                    <dd className="mt-1.5">
                      <RoleSelect role={user.role} />
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 border-t border-border pt-4">
                  <ManageButton />
                </div>
              </article>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium">Email</th>
                  <th scope="col" className="px-4 py-3 font-medium">Role</th>
                  <th scope="col" className="px-4 py-3 font-medium">Registration Date</th>
                  <th scope="col" className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user._id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <UserIdentity user={user} />
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-4 py-3">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-32">
                          <RoleSelect role={user.role} />
                        </div>
                        <ManageButton />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
