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
  });
}
