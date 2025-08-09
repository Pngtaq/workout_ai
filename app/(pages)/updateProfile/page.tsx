import React from "react";

import UpdateProfileForm from "@/components/ui/UpdateProfileForm";

const Page = async () => {
  return (
    <div className="p-2">
      <h1 className="text-sm bg-violet-600 text-white p-1 text-center rounded-md justify-self-start ">
        Update Profile
      </h1>
      <div>
        <UpdateProfileForm />
      </div>
    </div>
  );
};

export default Page;
