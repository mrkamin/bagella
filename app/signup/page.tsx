"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      alert("Sign up failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} className="border rounded" />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className="border rounded" />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="border rounded" />
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
