"use client";
import { profileInput } from "@/data/profileInput";
import UpdateProfileInput from "./UpdateProfileInput";
import { useForm } from "react-hook-form";
import { TUserProfileFormData } from "@/types/next-auth";
import { useUpdateUser } from "@/hooks/userHooks";
import toast from "react-hot-toast";

export default function UpdateProfileForm() {
  const { reset, register, handleSubmit } = useForm<TUserProfileFormData>({
    defaultValues: {
      age: 0,
    },
  });
  const updateUser = useUpdateUser();
  
  const onSubmit = handleSubmit((data) => {
    // Show loading toast
    const loadingToast = toast.loading("Updating your profile...");
    
    updateUser.mutate(data, {
      onSuccess: () => {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Profile updated successfully!");
        reset();
      },
      onError: (error) => {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error("Failed to update profile. Please try again.");
        console.error("Update profile error:", error);
      },
    });
  });

  return (
    <form
      className="text-sm bg flex flex-col items-center pt-20 justify-center"
      onSubmit={onSubmit}
    >
      <div className="w-full lg:max-w-1/3 space-y-2">
        <h1 className="text-center text-xl">Update your profile</h1>
        <div className="space-y-3 ">
          {profileInput.map((currentvalue, i) => {
            return (
              <UpdateProfileInput
                {...currentvalue}
                name={currentvalue.name as keyof TUserProfileFormData}
                register={register}
                key={i}
              />
            );
          })}
        </div>

        <div className="flex gap-x-3 flex-wrap">
          <p>Gender:</p>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            value="male"
            id="male"
            {...register("gender")}
            required
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            value="female"
            id="female"
            {...register("gender")}
            required
          />
          <label htmlFor="others">Others</label>
          <input
            type="radio"
            value="others"
            id="others"
            {...register("gender")}
            required
          />
        </div>

        <button 
          className={`bg-violet-500 rounded-[2px] text-md px-4 py-2 text-white w-full font-bold transition-colors ${
            updateUser.isPending 
              ? 'bg-violet-400 cursor-not-allowed' 
              : 'hover:bg-violet-600'
          }`}
          disabled={updateUser.isPending}
        >
          {updateUser.isPending ? "Updating..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
