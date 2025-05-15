import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Cart from "@/models/Cart";
import { connectToDB } from "@/lib/connectToDB";

export async function POST(req: NextRequest) {
  await connectToDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();
  const userId = session.user.id;

  const updatedCart = await Cart.findOneAndUpdate(
    { userId },
    { items },
    { upsert: true, new: true }
  );

  return NextResponse.json(updatedCart);
}

export async function GET() {
  await connectToDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await Cart.findOne({ userId: session.user.id });
  return NextResponse.json(cart || { items: [] });
}


