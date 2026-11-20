import EquipmentForm from "@/components/form/equipment-form";

const AddEquipment = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-bold">Add Equipment</h1>
        <p className="text-sm text-muted-foreground">
          List equipment for rent with clear details and a photo so renters can
          find it faster.
        </p>
      </div>

      <EquipmentForm />
    </div>
  );
};

export default AddEquipment;
