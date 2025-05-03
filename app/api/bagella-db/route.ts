import { connectToDB } from "@/lib/connectToDB"
import Product from "@/models/productModel";

export async function getproducts() {
    try {
        await connectToDB();
        const products = await Product.find({}).lean();
        return products;
    } catch (err) {
        console.log("error:", err)
    }
}