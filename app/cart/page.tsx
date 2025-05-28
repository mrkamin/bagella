"use client";

import BuyDialog from "@/components/BuyDialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/Cartcontext";
import { MinusIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
    return sum + numericPrice * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <div>
                  <h2 className="font-semibold text-primary">{item.name}</h2>
                  <p>{item.quantity} × {item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  <MinusIcon />
                </button>
                <Button
                  onClick={() =>
                    addToCart({
                      id: item?.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      productCode: item.productCode,
                      quantity: 1,
                    })
                  }
                  className="cursor-pointer"
                  aria-label="add-item"
                >
                  <Plus />
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-lg font-bold text-gray-800">
            Total Items: {totalItems}
          </div>
          <div className="text-lg font-bold text-gray-800">
            Total Price: ${total.toFixed(2)}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={clearCart}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
              <BuyDialog totalAmount={total} items={cart}>
  <Button className="cursor-pointer">Buy Now</Button>
</BuyDialog>
          </div>
          <div className="mt-10">
            <Link href="/">
              <button className="text-primary hover:underline">
                ← Back to Home
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
