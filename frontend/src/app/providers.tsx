"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TanstackProvider from "@/providers/TanstackProvider";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
          <TanstackProvider>
            {children}
            <ToastContainer />
          </TanstackProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
