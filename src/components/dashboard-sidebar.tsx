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
import { BookHeart, Boxes, CalendarCheck, PackageCheck, Plus, UserCog, Users2Icon,  Wrench } from "lucide-react";
import Link from "next/link";


const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  customer: [
    { name: "Profile", url: "/dashboard/profile", icon: UserCog },
    { name: "My Rentals", url: "/dashboard/myrental", icon: CalendarCheck },
    { name: "Favorites", url: "/dashboard/favorites", icon: BookHeart },

  ],
  owner: [
    { name: "My Profile", url: "/dashboard/profile", icon: UserCog },
    { name: "Add Equipment", url: "/dashboard/owner", icon: Plus },
    { name: "My Equipment", url: "/dashboard/owner/equipment", icon: Wrench },
    { name: "My Equipment Rental", url: "/dashboard/owner/equipment-rental", icon: Boxes },

  ],
  admin: [
    { name: "My Profile", url: "/dashboard/profile", icon: UserCog },
    { name: "All Users", url: "/dashboard/users", icon: Users2Icon },
    { name: "All Equipments", url: "/dashboard/admin/all-equipments", icon: PackageCheck },
    { name: "All Rentals", url: "/dashboard/admin/all-rental", icon: CalendarCheck },

  ],
}

const DashboardSidebar = () => {
  const { data: session } = useSession()
 const role = ((session?.user as { role?: UserRole } | undefined)?.role) ?? "customer"
  const items = menuItemsByRole[role]





  return (
     <Sidebar className="top-16 h-[calc(100svh-4rem)]">
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
