"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {

  if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
    return (
      <NextUIProvider>
        <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
          <Layout>
            {children}
          </Layout>
        </NextThemesProvider>
      </NextUIProvider>
    );
  } else {
    return (
      <NextUIProvider>
        <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    );
  }
}
