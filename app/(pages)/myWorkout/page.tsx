"use client";

import { useGetWorkout } from "@/hooks/workoutHooks";
import { motion } from "framer-motion";
import OverviewItem from "@/components/ui/myworkout/OverviewItem";
import WorkoutList from "@/components/ui/myworkout/WorkoutList";
import DietList from "@/components/ui/myworkout/DietList";

type WorkoutDay = {
  day: string;
  warmup: string[];
  mainWorkout: string[];
  cooldown: string[];
};
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

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent">
          Daily Workouts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {data.data.days.map((day: WorkoutDay, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-semibold text-lg text-violet-600 mb-4">
                {day.day}
              </h3>
              <WorkoutList title="Warmup" items={day.warmup} />
              <WorkoutList title="Main Workout" items={day.mainWorkout} />
              <WorkoutList title="Cooldown" items={day.cooldown} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent mb-6">
          Diet Tips
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-700">
          <OverviewItem
            label="Hydration"
            value={data.data.dietTips.hydration}
          />
          <DietList label="Meals" items={data.data.dietTips.meals} />
          <DietList label="Pre-Workout" items={data.data.dietTips.preWorkout} />
          <DietList
            label="Post-Workout"
            items={data.data.dietTips.postWorkout}
          />
        </div>
      </motion.section>
    </div>
  );
}
