"use client";

import CreateWorkOutForm from "@/components/ui/CreateWorkoutForm";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { TCreateWorkoutProps, TWorkout } from "@/types/next-auth";

import { useSaveWorkout } from "@/hooks/workoutHooks";

export default function Page() {
  const [text, setText] = useState<TCreateWorkoutProps>();
  const [plan, setPlan] = useState<TWorkout | undefined>();
  const [days, setDays] = useState<
    { day: string; warmup: string[]; mainWorkout: string[] }[]
  >([]);
  const [dietTips, setDietTips] = useState<{
    hydration: string;
    meals: string[];
    preWorkout: string[];
    postWorkout: string[];
  }>({
    hydration: "",
    meals: [],
    preWorkout: [],
    postWorkout: [],
  });
  type Overview = {
    daysPerWeek?: number;
    dietTip?: string;
    duration?: string;
    focus?: string;
  };
  const [overview, setOverview] = useState<Overview>({});

  const summary = `
<strong>Overview</strong> \n
<strong>Days per week: </strong>> ${overview.daysPerWeek}
<strong>Diet Tip: </strong>> ${overview.dietTip}
<strong>Duration: </strong>> ${overview.duration}
<strong>Focus: </strong>> ${overview.focus}
${days
  .map(
    (day) => `
${day.day}
<strong>Warm up:\n</strong>${day.warmup.join("\n") + "\n"}
<strong>Main Workout: \n</strong>${day.mainWorkout.join("\n")}
`
  )
  .join("\n")}

<strong>Hydration: </strong>${dietTips.hydration} \n
<strong>Meals: </strong>\n${dietTips.meals.join("\n") + "\n"}
<strong>Pre-Workout Meal:\n</strong>${dietTips.preWorkout.join("\n") + "\n"}
<strong>Post-Workout Meal:\n</strong>${dietTips.postWorkout.join(" ")}
`;

  const { register, handleSubmit } = useForm<TCreateWorkoutProps>();

  const cohereAI = async (payload: object) => {
    const res = await fetch("/api/cohereAI", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    const parsed = JSON.parse(result.message.content[0].text);

    setPlan(parsed);
    setDays(parsed.days);
    setDietTips(parsed.dietTips);
    setOverview(parsed.overview);
  };
  const submitForm = handleSubmit((data) => {
    setText(data);

    const payload = {
      text: `Equipments & Prompt: ${data.prompt}\nDay/s: ${data.days}\nDifficulty: ${data.difficulty}\nDiet: ${data.diet}`,
    };

    cohereAI(payload);
  });

  const saveWorkout = useSaveWorkout();
  const submitWorkout = () => {
    alert("domo");
    console.log(plan);
    if (plan) {
      saveWorkout.mutate(plan);
    } else {
      alert("No workout plan to save.");
    }
  };

  // if (!plan) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-2 grid-rows-[30px_1fr] gap-4 lg:grid-cols-[120px_1fr_40px] lg:grid-rows-1 items-start p-4 h-full">
      {/* Left: Header */}

      <div className="order-1 md:order-1">
        <h1 className="text-sm font-extralight bg-violet-600 text-white p-1 text-center rounded-md ">
          Create Workout
        </h1>
      </div>

      {/* Middle: Form and Typewriter */}
      <div className="order-3 md:order-2 col-span-2 lg:col-span-1 row-start-2 lg:row-start-auto flex flex-col justify-between h-full w-full sm:max-h-100 md:max-h-150 lg:max-h-240 space-y-3  md:px-10 pt-10 py-5 max-w-280 bg-gray-50 rounded-2xl justify-self-center">
        <div
          className="px-2 space-y-3 grid-cols-1 overflow-y-auto text-sm tracking-wider"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          <div className="bg-gray-300 rounded-2xl px-2 py-2 max-w-1/5 text-center ">
            Let’s build your workout!
          </div>
          {text && (
            <div className="justify-self-end bg-violet-500 rounded-2xl px-2 py-2 max-w-1/2 text-white ">
              <h3 className=" font-semibold">Workout Summary</h3>
              <div className="flex flex-wrap flex-col">
                <div className="flex-1">
                  <span className="font-bold">Equipments & Prompt: </span>
                  {text?.prompt}
                </div>
                <div>
                  <div>
                    <span className="font-bold">Days: </span> {text?.days}
                  </div>
                  <div>
                    <span className="font-bold">Difficulty: </span>
                    {text?.difficulty}
                  </div>
                  <div>
                    <span className="font-bold">Type of Diet: </span>{" "}
                    {text?.diet}
                  </div>
                </div>
              </div>
            </div>
          )}

          {days && overview && plan && (
            <div className="bg-gray-300 rounded-2xl px-2 py-2 max-w-1/2 text-sm space-y-2 grid">
              <pre className="whitespace-pre-wrap text-sm">
                <Typewriter
                  options={{ delay: 20 }}
                  onInit={(typewriter) => {
                    typewriter.typeString(summary).start();
                  }}
                />
              </pre>
              <button
                className="justify-self-end mr-1 rounded-sm hover:bg-gray-400 p-1"
                onClick={submitWorkout}
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/copy-dark.png"
                  alt="copy"
                />
                Save Workout
              </button>
            </div>
          )}
        </div>

        <CreateWorkOutForm submitForm={submitForm} register={register} />
      </div>

      {/* Right: Delete Button */}
      <div className="order-2 md:order-3 flex justify-end">
        <button className="rounded-md bg-violet-600 flex gap-x-2 p-1">
          <Image
            src="/icons/bin-light.png"
            width={20}
            height={20}
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
}
