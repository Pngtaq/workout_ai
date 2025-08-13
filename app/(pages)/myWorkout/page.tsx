"use client";

import { useGetWorkout } from "@/hooks/workoutHooks";
export default function Page() {
  const { data, isLoading, error } = useGetWorkout();
  console.log(data);
  return (
    <div>
      <div>
        <h1>Overview</h1>
        <p>Days per week: </p>
        <p>Duration: </p>
        <p>Focus: </p>
      </div>

      <div>
        <h1>Diet Tips</h1>
        <p>Hydration: </p>
        <p>Meals: //component </p>
        <p>Post workout//component </p>
        <p>Pre workout//component </p>
      </div>

      <div>{/* <Workout ></Workout> */}</div>
    </div>
  );
}
