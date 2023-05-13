import { QueryClient } from "@tanstack/react-query";

const DEFAULT_STALE_TIME = 0;
const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: DEFAULT_CACHE_TIME,
      retry: false,
    },
  },
});
