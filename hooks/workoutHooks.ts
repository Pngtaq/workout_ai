import { TWorkout } from "@/types/next-auth";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useSaveWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TWorkout) =>
      fetch("/api/workout", {
        method: "PATCH",
        body: JSON.stringify({ workout: data }),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
      // Also invalidate user data since workout is part of user
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useGetWorkout() {
  return useQuery({
    queryKey: ["workout"],
    queryFn: async () => {
      const res = await fetch("/api/workout", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch workout");
      return res.json();
    },
    // Workout data is considered fresh for 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Don't refetch on window focus
    refetchOnWindowFocus: false,
    // Don't refetch on reconnect
    refetchOnReconnect: false,
    // Cache the data for 15 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes (formerly cacheTime)
  });
}
