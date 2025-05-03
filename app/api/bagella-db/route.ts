// app/api/bagella-db/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/productModel";

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find({}).lean();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatted = products.map((product: any) => ({
      _id: product._id.toString(),
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
