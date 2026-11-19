"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { MenuItem } from "@/types/navigations";
import { UserRole } from "@/types/UserRole";
import { BookHeart, CalendarCheck, PackageCheck, Plus, UserCog, Users2Icon,  Wrench } from "lucide-react";
import Link from "next/link";


const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  customer: [
    { name: "My Rentals", url: "/dashboard/myrental", icon: CalendarCheck },
    { name: "Favorites", url: "/dashboard/favorites", icon: BookHeart },
    { name: "Profile", url: "/dashboard/profile", icon: UserCog },

  ],
  owner: [
    { name: "Add Equipment", url: "/dashboard/recruiter", icon: Plus },
    { name: "My Equipment", url: "/dashboard/recruiter/company", icon: Wrench },
    { name: "My Equipment Rental", url: "/dashboard/recruiter/company", icon: Wrench },
    { name: "My Profile", url: "/dashboard/recruiter/company", icon: UserCog },

  ],
  admin: [
    { name: "All Users", url: "/dashboard/admin", icon: Users2Icon },
    { name: "All Equipments", url: "/dashboard/admin/users", icon: PackageCheck },
    { name: "All Rentals", url: "/dashboard/admin/companies", icon: CalendarCheck },
    { name: "My Profile", url: "/dashboard/admin/jobs", icon: UserCog },

  ],
}

const DashboardSidebar = () => {
  const { data: session } = useSession()
 const role = ((session?.user as { role?: UserRole } | undefined)?.role) ?? "customer"
  const items = menuItemsByRole[role]





  return (
     <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;
