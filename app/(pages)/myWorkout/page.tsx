"use client";

import { useGetWorkout } from "@/hooks/workoutHooks";
import { motion } from "framer-motion";

export default function Page() {
  const { data, isLoading, error } = useGetWorkout();
  console.log(data);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 animate-pulse">
        Loading workout plan...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load workout plan.
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-center text-gray-500 py-10">No workout data found.</p>
    );
  }

  return <div></div>;
}
