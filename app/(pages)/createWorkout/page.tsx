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
    if (plan) {
      saveWorkout.mutate(plan);
    } else {
      alert("No workout plan to save.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Header */}
      <header className="p-3  flex items-center justify-between">
        <h1 className="text-sm font-light bg-violet-600 text-white px-3 py-1 rounded-md">
          Create Workout
        </h1>
        <button className="rounded-md bg-violet-600 flex gap-x-2 p-1">
          <Image
            src="/icons/bin-light.png"
            width={20}
            height={20}
            alt="delete"
          />
        </button>
      </header>

      {/* Chat Area */}
      <main
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-4 max-w-3xl w-full self-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* System intro message */}
        <div className="bg-gray-200 rounded-2xl px-4 py-2 text-center w-fit self-start">
          Let’s build your workout!
        </div>

        {/* User summary bubble */}
        {text && (
          <div className="bg-violet-500 text-white rounded-2xl px-4 py-3 max-w-[80%] self-end">
            <h3 className="font-semibold mb-1">Workout Summary</h3>
            <p>
              <span className="font-bold">Equipments & Prompt: </span>
              {text?.prompt}
            </p>
            <p>
              <span className="font-bold">Days: </span>
              {text?.days}
            </p>
            <p>
              <span className="font-bold">Difficulty: </span>
              {text?.difficulty}
            </p>
            <p>
              <span className="font-bold">Diet: </span>
              {text?.diet}
            </p>
          </div>
        )}

        {/* AI Response bubble */}
        {days && overview && plan && (
          <div className="bg-gray-200 rounded-2xl px-4 py-3 max-w-[80%] self-start text-sm space-y-3">
            <pre className="whitespace-pre-wrap text-sm">
              <Typewriter
                options={{ delay: 20 }}
                onInit={(typewriter) => {
                  typewriter.typeString(summary).start();
                }}
              />
            </pre>
            <button
              className="rounded-md hover:bg-gray-300 px-2 py-1 flex items-center gap-2 text-xs bg-gray-300 "
              onClick={submitWorkout}
            >
              <Image
                width={20}
                height={20}
                src="/icons/copy-dark.png"
                alt="copy"
              />
              Save
            </button>
          </div>
        )}
      </main>

      {/* Fixed Input */}
      <footer className="py-4 px-2 bg-white shadow-gray-600 shadow-2xl">
        <div className="max-w-3xl w-full mx-auto">
          <CreateWorkOutForm submitForm={submitForm} register={register} />
        </div>
      </footer>
    </div>
  );
}
