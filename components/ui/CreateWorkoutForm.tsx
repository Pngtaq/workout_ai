import Image from "next/image";
import InputTag from "./InputTag";

import { UseFormRegister } from "react-hook-form";
import { TCreateWorkoutProps } from "@/types/next-auth";

type CreateWorkoutFormProps = {
  register: UseFormRegister<TCreateWorkoutProps>;
  submitForm: React.FormEventHandler<HTMLFormElement>;
};

const CreateWorkOutForm = ({
  register,
  submitForm,
}: CreateWorkoutFormProps) => {
  return (
    <form onSubmit={submitForm} className="px-4 py-6 rounded-4xl bg-gray-300">
      <div className="flex justify-between items-center gap-x-2">
        <InputTag register={register} />
        <div className="">
          <button
            type="submit"
            className="rounded-full bg-gray-500 text-white w-8 py-2 flex items-center justify-center gap-x-1"
          >
            <Image
              src="/icons/arrow-light.png"
              width={13}
              height={13}
              alt="delete"
              className="rotate-270"
            />
          </button>
        </div>
      </div>

      <div className="flex gap-x-4 items-center  flex-wrap pt-1 pl-4 text-sm relative">
        <div className="relative">
          <label htmlFor="days">Days:</label>
          <select
            {...register("days")}
            id="days"
            name="days"
            className="px-2 focus:outline-0"
            defaultValue="1"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4 </option>
            <option value="5">5 </option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty: </label>
          <select
            {...register("difficulty")}
            id="difficulty"
            name="ifficulty"
            className="focus:outline-0"
            defaultValue="light"
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <div>
          <label htmlFor="diet">Diet:</label>
          <select
            {...register("diet")}
            id="diet"
            name="diet"
            className="px-2 focus:outline-0"
            defaultValue="balanced"
          >
            <option value="balanced">Balanced</option>
            <option value="high-protein">High-Protein</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="paleo">Paleo </option>
            <option value="carb cycling">Carb Cycling</option>
            <option value="body building">Body Building</option>
          </select>
        </div>

        {/*balanced high-protein medirerranean paleo carb cycling body building diet*/}
      </div>
    </form>
  );
};

export default CreateWorkOutForm;
