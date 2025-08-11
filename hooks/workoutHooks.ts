import { TWorkout } from "@/types/next-auth";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useSaveWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TWorkout) =>
      fetch("/api/createWorkout", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
    },
  });
}

export function useGetWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TWorkout) =>
      fetch("/api/createWorkout", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
    },
  });
}
