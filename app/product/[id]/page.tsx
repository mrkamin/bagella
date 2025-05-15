import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { ProductType } from "@/types/Types";

// Type for route params
type Params = { id: string };

// Allow dynamic routes
export const dynamicParams = true;

const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bagella-db`, {
    cache: "no-store",
  });
  const products = await res.json();
// Static generation for each product
export async function generateStaticParams() {
  return products.map((product: ProductType) => ({
    id: product._id,
  }));
}

// Metadata generation
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
    const params = await paramsPromise;
  const product = products.find((p: { id: string; }) => p.id === params.id);
  return {
    title: product?.name ?? "Product Not Found",
    description: product?.description ?? "",
  };
}


export default async function ProductDetailPage({ 
    params: paramsPromise,
 }: { params: Promise<Params>;
  }) {
  const params = await paramsPromise;
  const product = products.find((p: ProductType) => p._id === params.id);
  return <ProductDetailClient product={product} allProducts={products} />;
}