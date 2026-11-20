import ProfileUpdate from "@/components/profile/profile-update";

const OwnerProfile = async () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-bold">Account &amp; Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and how you appear to renters.
        </p>
      </div>

      <ProfileUpdate />
    </div>
  );
};

export default OwnerProfile;
