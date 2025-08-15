// app/(pages)/dashboard/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";

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
      {/* Sections will be added in next commits */}
    </div>
  );
}
