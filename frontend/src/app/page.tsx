"use client";

import { Auth } from "@/components";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <NextUIProvider>
        <Auth />
      </NextUIProvider>
    </main>
  );
}
