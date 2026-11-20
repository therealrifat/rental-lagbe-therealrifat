import ProfileUpdate from "@/components/profile/profile-update";

const OwnerProfile = async () => {
  return (
    <div>
      <div>
        <div className=" max-w-2xl mx-auto flex items-center  my-10 bg-slate-200 h-20 rounded-2xl  ">
          <h1 className="px-5 text-3xl font-semibold">Account & Profile </h1>
        </div>

        <div>
          <ProfileUpdate />
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
