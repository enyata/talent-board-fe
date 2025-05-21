'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';

export default function TanstackQueyProvider({ children }: { children: ReactNode }) {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            {children}
            <Toaster richColors />
        </QueryClientProvider>
    );
}
