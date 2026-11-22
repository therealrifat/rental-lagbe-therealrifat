import AdminEquipmentBrowser from "@/components/admin/admin-equipment-browser";
import AdminSummaryCards from "@/components/admin/admin-summary-cards";

import { getAdminAllEquipment } from "@/lib/api/users";

const AllEquipmentPage = async () => {

  const equipments = await getAdminAllEquipment();


 
  const pending = equipments.filter((item) => item.status === "Pending").length;
  const approved = equipments.filter((item) => item.status === "Approved").length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl">All Equipment</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Review submitted equipment, approve or reject listings, and manage
          existing items.
        </p>
      </header>

      <AdminSummaryCards
        total={equipments.length}
        pending={pending}
        approved={approved}
      />

      <AdminEquipmentBrowser equipments={equipments} />
    </div>
  );
};

export default AllEquipmentPage;
