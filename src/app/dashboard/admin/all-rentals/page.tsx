import AdminRentalBrowser from "@/components/admin/admin-rental-browser";
import AdminRentalSummaryCards from "@/components/admin/admin-rental-summary-cards";
import { getAdminRentals } from "@/lib/api/users";



const AllRentalPage = async () => {
  
  const rentals = await getAdminRentals();



  const pending = rentals.filter((item) => item.bookingStatus === "Pending").length;
  const approved = rentals.filter((item) => item.bookingStatus === "Approved").length;
  const rejected = rentals.filter((item) => item.bookingStatus === "Rejected").length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl">All Rentals</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Monitor and manage all rental booking activities across customers and
          owners.
        </p>
      </header>

      <AdminRentalSummaryCards
        total={rentals.length}
        pending={pending}
        approved={approved}
        rejected={rejected}
      />

      <AdminRentalBrowser rentals={rentals} />
    </div>
  );
};

export default AllRentalPage;
