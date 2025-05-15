'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <Button 
        onClick={() => signIn("google")} 
        className="btn"
    >
            Sign in with Google
    </Button>
    </div>
  );
}
