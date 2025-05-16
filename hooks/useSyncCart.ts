"use client";
import { useCart } from "@/context/Cartcontext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useSyncCart = () => {
  const { data: session } = useSession();
  const { cart, clearCart } = useCart();

  useEffect(() => {
    const syncLocalToMongo = async () => {
      if (session?.user?.id && cart.length > 0) {
        try {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart }),
          });
          clearCart(); 
        } catch (err) {
          console.error("Failed to sync cart:", err);
        }
      }
    };
    syncLocalToMongo();
  }, [session?.user?.id, cart, clearCart]);
};
