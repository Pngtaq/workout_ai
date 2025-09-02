"use client";

import { InfoRow } from "@/components/ui/InfoRow";
import { Clock } from "@/components/ui/Clock";
import { OverviewItem } from "@/components/ui/OverviewItem";
import { Timer } from "@/components/ui/Timer";
import { useGetUser } from "@/hooks/userHooks";
import LoaderSpinner from "@/components/ui/LoaderSpin";

export default function Dashboard() {
  const { data, isLoading, error } = useGetUser();

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  const user = data?.data;

  return (
    <div className="p-4 space-y-8 w-[90%] ">
      <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-violet-500 mb-4">
          Profile Overview
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <InfoRow label="Name" value={`${user.firstName} ${user.lastName}`} />

          <InfoRow label="Age" value={user.age} />
          <InfoRow label="Gender" value={user.gender} />
          <InfoRow
            label="Height"
            value={`${user.heightInFeet} ft ${user.heightInInches} in`}
          />
          <InfoRow label="Weight" value={`${user.weight} lbs`} />
          <InfoRow label="BMI" value={`${user.bmi} (${user.bmiEquivalent})`} />
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-violet-500 mb-4">
          Workout Overview
        </h2>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mt-3 space-y-1 text-center">
            <OverviewItem
              label="Days per Week"
              value={user?.workout?.overview?.daysPerWeek ?? "-"}
            />
            <OverviewItem
              label="Duration"
              value={user?.workout?.overview?.duration ?? "-"}
            />
            <OverviewItem
              label="Focus"
              value={user?.workout?.overview?.focus ?? "-"}
            />
          </div>
        </div>
      </section>

      {/* Fitness Dashboard */}
      <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-violet-500 mb-6">
          Fitness Dashboard
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Clock />

          <Timer />
        </div>
      </section>
    </div>
  );
}
