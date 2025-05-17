"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/Types"; // Create this if needed
import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/Cartcontext";
import BuyDialog from "@/components/BuyDialog";

type Props = {
  product: Product | undefined;
  allProducts: Product[];
};

export default function ProductDetailClient({ product }: Props) {
  const {addToCart} = useCart()

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-10">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-auto mb-6 rounded"
        />
        <div>
            <CardHeader className='text-xl'>
                <CardTitle>
                    {product.name}
                </CardTitle>
                <CardDescription className='text-pretty'>
                    {product.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-between'>
                <span className='text-xl text-primary font-medium'>
                    £{product.price}
                </span>
                <CardFooter className='flex justify-between gap-2'>
               <BuyDialog
  items={[{
    id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: 1,
  }]}
  totalAmount={parseFloat(product.price.toString())}
>
  <Button className="cursor-pointer">Buy Now</Button>
</BuyDialog>

                <Button 
                  onClick={() => { 
                    console.log("clicked ")
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  }
                 }
                      className="cursor-pointer"
                      aria-label="view-details"
                >
                  Add to Cart
                </Button>
                </CardFooter>
            </CardFooter>
        </div>
      </div>
       {/* Customer Reviews */}
       <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Customer Reviews
        </h2>
        <div className="text-gray-600">
          ⭐️⭐️⭐️⭐️☆ - Beautiful craftsmanship! Would buy again.
        </div>
        <div className="text-gray-600 mt-2">
          ⭐️⭐️⭐️⭐️⭐️ - Absolutely love it! Fast shipping too.
        </div>
      </div>

      <div className="mt-10">
        <Link href="/">
          <button className="text-yellow-700 hover:underline">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}