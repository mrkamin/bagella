
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
}
