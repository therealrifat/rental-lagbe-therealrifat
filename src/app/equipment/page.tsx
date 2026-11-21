import EquipmentCard from "@/components/equipment/equipment-card";
import EquipmentFilters from "@/components/equipment/equipment-filters";

import { getAllEquipments } from "@/lib/api/users";
import { EquipmentRecord } from "@/types/equipment";

const AllEquipment = async() => {

  const result =await getAllEquipments()

  // const equipments = dummyEquipments.filter(
  //   (equipment) => equipment.status === "Approved",
  // );

  const equipments = result




  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6 space-y-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Browse equipment
        </p>
        <h1 className="text-2xl font-bold sm:text-3xl">All Equipment</h1>
        <p className="text-sm text-muted-foreground">
          Explore approved equipment available for rent near you.
        </p>
      </header>

      <EquipmentFilters />

      <div className="mb-4 mt-8 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Approved equipment</h2>
        <span className="text-xs text-muted-foreground">
          {equipments.length} items
        </span>
      </div>

      {equipments.length === 0 ? (
        <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
          No approved equipment available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {equipments.map((equipment:EquipmentRecord) => (
            <EquipmentCard key={equipment._id} equipment={equipment} />
          ))}
        </div>
      )}
    </main>
  );
};

export default AllEquipment;
