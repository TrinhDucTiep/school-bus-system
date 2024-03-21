"use client";

import { Auth } from "@/components";
import { redirect } from 'next/navigation'

export default function Home() {
  if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
    return (
      <main className="overflow-hidden">
        <Auth />
      </main>
    );
  } else {
    redirect('/login')
  }
}
