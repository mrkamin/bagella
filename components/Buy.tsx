"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BuyProps } from "@/types/Types";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Atom } from "lucide-react";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? (() => {
    throw new Error("Missing Stripe publishable key.");
  })()
);

const Buy = ({ id }: BuyProps) => {
  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch("/api/bagella-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data?.error) throw new Error("Something went wrong!");
      return data.client_secret;
    } catch (error) {
      throw error;
    }
  }, [id]);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Purchase</Button>
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

export default Buy;
