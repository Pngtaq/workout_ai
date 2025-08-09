"use client";
import { TCreateWorkoutProps } from "@/types/next-auth";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

type InputTagProps = {
  register: UseFormRegister<TCreateWorkoutProps>;
};

const InputTag = ({ register }: InputTagProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  // const removeTag = (index: number) => {
  //   setTags(tags.filter((_, i) => i !== index));
  // };
  return (
    <div className="flex flex-col max-h-20 w-full">
      <div className="flex flex-wrap gap-2 items-center px-2 py-1 focus-within:ring-1 ring-gray-500 text-sm overflow-y-auto rounded-2xl">
        <input
          required
          type="text"
          {...register("prompt")}
          onKeyDown={handleKeyDown}
          placeholder="Provide equipments and other things you want to add"
          className="flex-1 min-w-[100px] border-none outline-none py-1 px-2"
        />
      </div>
    </div>
  );
};

export default InputTag;
