import { redirect } from "next/navigation";

import FavoriteTable from "@/components/favorites/favorite-table";
import { getFavorites } from "@/lib/actions/favorites";
import { getUserSessionServer } from "@/lib/core/session-server";

const FavoritesPage = async () => {
  const session = await getUserSessionServer();
  if (!session) redirect("/login");

  const favorites = await getFavorites(session.user.id);
  console.log(favorites)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl">My Favorites</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Equipment you saved for later, all in one place.
        </p>
      </header>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Saved equipment</h2>
        <span className="text-xs text-muted-foreground">
          {favorites.length} items
        </span>
      </div>

      <FavoriteTable favorites={favorites} customerId={session.user.id} />
    </div>
  );
};

export default FavoritesPage;
