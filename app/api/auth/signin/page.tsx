
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4  items-center">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded"/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded" />
      <Button type="submit">Sign In</Button>
      <div>
        No Account?{" "} 
      <Link href="/signup" className="text-primary hover:text-secondary transition"> Create One</Link>
      </div>
    </form>
  );
}
