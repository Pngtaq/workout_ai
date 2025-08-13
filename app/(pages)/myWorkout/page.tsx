"use client";

import { useGetWorkout } from "@/hooks/workoutHooks";
import { motion } from "framer-motion";
import OverviewItem from "@/components/ui/myworkout/OverviewItem";

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

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Overview */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent mb-6">
          Workout Overview
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-700">
          <OverviewItem
            label="Days per Week"
            value={data.data.overview.daysPerWeek}
          />
          <OverviewItem label="Duration" value={data.data.overview.duration} />
          <OverviewItem label="Focus" value={data.data.overview.focus} />
          <OverviewItem label="Diet Tip" value={data.data.overview.dietTip} />
        </div>
      </motion.section>
    </div>
  );
}

/* Reusable Components */
