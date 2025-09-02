"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // Avoid re-creating QueryClient on every render
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Only refetch on window focus if data is stale
        refetchOnWindowFocus: false,
        // Don't refetch on reconnect if data is fresh
        refetchOnReconnect: false,
        // Retry failed requests 3 times
        retry: 3,
        // Retry delay increases exponentially
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Enable background refetching for better UX
        refetchOnMount: true,
        // Keep data in cache for 10 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
      mutations: {
        // Retry failed mutations 3 times
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Enable optimistic updates for better UX
        onMutate: async (variables) => {
          // Cancel any outgoing refetches
          await queryClient.cancelQueries({ queryKey: ["user"] });
          await queryClient.cancelQueries({ queryKey: ["workout"] });
        },
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
