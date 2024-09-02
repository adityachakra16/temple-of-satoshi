"use client";

import { useState } from "react";

import { IProvider } from "@web3auth/base";
import { ProviderContext, useProviderContext } from "@/context/provider";
import { LoginView } from "@/components/login";

export default function Home() {
  const provider = useProviderContext();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProviderContext.Provider value={provider}>
        <LoginView />
      </ProviderContext.Provider>
    </main>
  );
}
