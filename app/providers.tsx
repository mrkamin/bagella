"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/Cartcontext";
import CartSyncProvider from "@/context/CartSyncProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <CartSyncProvider />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
