
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BuyProps } from "@/types/Types";
import { Atom } from "lucide-react";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? (() => {
    throw new Error("Missing Stripe publishable key.");
  })()
);

const BuyDialog = ({ id, items, totalAmount, children }: BuyProps & { children: React.ReactNode }) => {
  const fetchClientSecret = useCallback(async () => {
    const body = id ? { id } : { items, totalAmount };

    const res = await fetch("/api/bagella-db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data?.error) throw new Error("Something went wrong!");
    return data.client_secret;
  }, [id, items, totalAmount]);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="my-4 py-12 lg:max-w-screen-xl">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Atom className="transition ease-in-out group-hover:stroke-primary" />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-semibold">
              bagella
            </span>
          </DialogTitle>
          <EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
            <EmbeddedCheckout className="h-[80dvh] w-full overflow-y-auto" />
          </EmbeddedCheckoutProvider>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel Payment</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
