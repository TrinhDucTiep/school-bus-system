"use client";
import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { LayoutClient } from "@/components/layout/layout-client";


export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export default function ClientWithLayoutGroup({ children, themeProps }: ProvidersProps) {

    return (
        <LayoutClient>
            {children}
        </LayoutClient>
    );

}
