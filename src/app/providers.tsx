'use client';
import React from "react";
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {config} from "../../wagmiConfig";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiConfig>
    );
}
