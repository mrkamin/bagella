import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/productModel";
import { stripe } from '@/lib/Stripe';
import { ItemType, ProductType } from '@/types/Types';

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find({}).lean();

    const formatted: ProductType[] = products.map((product) => ({
      _id: String(product._id),
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      productCode: product.productCode,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await connectToDB();
    let line_items = [];
    if (data.id) {
    const product = await Product.findById(data.id);
    if (!product) {
      return NextResponse.json({error: "Product not found!"},
        {status: 400}
      )
    }
    line_items.push({
        price_data: {
          unit_amount: product.price * 100,
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
        },
        quantity: 1,
      });
    } else if (data.items && Array.isArray(data.items)) {

          line_items = data.items.map((item: ItemType) => ({
        price_data: {
          unit_amount: item.price * 100,
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
        },
        quantity: item.quantity,
      }));
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }


    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items,
      custom_fields: [
        {
          key: "location",
          label: {type: "custom", custom: "Delivery Location"},
          type: "text",
        },
      ],

      payment_method_types: ["card"],
      mode: "payment",
      return_url: `${request.headers.get(
        "origin"
      )}/paymentResult?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "Something went wrong!"},
      {status: 400}
    )
  }
}