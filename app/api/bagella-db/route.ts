import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/productModel";
import { ProductType } from "@/types/Types";

export async function getproducts(): Promise<ProductType[]> {
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

    return formatted;
  } catch (err) {
    console.log("error:", err);
    return [];
  }
}
