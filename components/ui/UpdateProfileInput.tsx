import { TUserProfileFormData } from "@/types/next-auth";

import { UseFormRegister } from "react-hook-form";

interface ProfileInputProps {
  label?: string;
  type: string;
  name: keyof TUserProfileFormData;
  placeholder: string;
  measurement?: string;
  minValue?: string | number;
  maxValue?: string | number;
  register: UseFormRegister<TUserProfileFormData>;
}

export default function UpdateProfileInput({
  label = "",
  type,
  name,
  placeholder,
  measurement,
  minValue,
  maxValue,
  register,
}: ProfileInputProps) {
  return (
    <div className="">
      <label className="block font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          {...(type === "number"
            ? register(name, { valueAsNumber: true })
            : register(name))}
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded px-2 py-1 pr-16 focus:outline-none"
          min={minValue}
          max={maxValue}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
          {measurement}
        </span>
      </div>
    </div>
  );
}
