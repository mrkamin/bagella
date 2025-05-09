import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/productModel";
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