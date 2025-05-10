import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB"; // Adjust path as needed
import Product from "@/models/productModel"; // Adjust path as needed

export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const data = await request.json();
        const newProduct = new Product(data);
        await newProduct.save();
        return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}