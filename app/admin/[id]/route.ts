import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/productModel";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.pathname.split("/").pop();
        await connectToDB();
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }
        await connectToDB();
        let data;
        try {
            data = await request.json();
            console.log("Received data for update:", data); // Log incoming data
        } catch (error) {
            console.error("Failed to parse JSON body:", error);
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            params.id,
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}