'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // We use useState so that the client is only created once
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // This tells the app: "If I fetch data, it stays 'fresh' for 1 minute"
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
