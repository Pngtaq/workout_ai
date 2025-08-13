import { TWorkout } from "@/types/next-auth";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useSaveWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TWorkout) =>
      fetch("/api/createWorkout", {
        method: "PATCH",
        body: JSON.stringify({ workout: data }),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
    },
  });
}

export function useGetWorkout() {
  return useQuery({
    queryKey: ["workout"],
    queryFn: async () => {
      const res = await fetch("/api/createWorkout", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch workout");
      return res.json();
    },
  });
}
