"use client";

import * as React from "react";
import { Auth } from "@/components";
import { redirect } from 'next/navigation'

export default function Home() {
  const [accessToken, setAccessToken] = React.useState<string | null>();
  const [refreshToken, setRefreshToken] = React.useState<string | null>();

  React.useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
    setRefreshToken(localStorage.getItem('refreshToken'));
  }, []);

  if (accessToken && refreshToken) {
    return (
      <main className="overflow-hidden">
        <Auth />
      </main>
    );
  } else {
    redirect('/login')
  }
}
