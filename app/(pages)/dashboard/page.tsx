"use client";

import { useQuery } from "@tanstack/react-query";
import { InfoRow } from "@/components/ui/InfoRow";
import { Clock } from "@/components/ui/Clock";
import { OverviewItem } from "@/components/ui/OverviewItem";
import { Timer } from "@/components/ui/Timer";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userDashboard"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch user data");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading dashboard...</div>
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
    <div className="p-6 space-y-8">
      {/* Profile Overview */}
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

      {/* Workout Overview */}
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
