import { TUserProfileFormData } from "@/types/next-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: TUserProfileFormData) =>
      fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user", { method: "GET" });

      if (!res.ok) throw new Error("Failed to fetch user");

      return res.json(); // returns { data: user }
    },
    // User data is considered fresh for 10 minutes
    staleTime: 10 * 60 * 1000, // 10 minutes
    // Don't refetch on window focus
    refetchOnWindowFocus: false,
    // Don't refetch on reconnect
    refetchOnReconnect: false,
    // Cache the data for 30 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
  });
}
