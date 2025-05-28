"use client";

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { ProductProps } from '@/types/Types';
import Link from 'next/link';
import { useCart } from '@/context/Cartcontext';
import { Heart, ShoppingBag, ShoppingCart, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import BuyDialog from './BuyDialog';

const Item = ({ product }: ProductProps) => {
  const { addToCart, cart } = useCart();

  const productInCart = cart.find((item) => item.id === product._id);
  const quantity = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      productCode: product.productCode,
      quantity: 1,
    });
  };
  return (
    <Card className="flex flex-col pt-0 relative overflow-hidden">
      <div className="relative flex justify-center items-center h-60 bg-slate-100 overflow-hidden">
        <Link href={`/product/${product._id}`} className="w-full h-full absolute inset-0 z-10" aria-label="View product details" />
        
        <Image
          alt={product.name}
          width={300}
          height={300}
          src={product.image}
          className="object-contain max-h-60 z-0"
        />

        {/* Action Buttons */}
        <div className="absolute w-full bottom-0 duration-500 ease-in-out flex justify-between p-2 bg-white/80 z-20">
          <button onClick={handleAddToCart} aria-label="Add to cart" className="relative cursor-pointer group">
            {quantity > 0 && (
              <>
                <Check className="absolute bottom-4 text-green-600" />
                <span className="absolute bottom-3 -right-3 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {quantity}
                </span>
             </>
              
            )}
            <ShoppingCart className="text-primary hover:text-input" />
            <div className="absolute -top-8 left-[3%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-black/80 text-xs px-2 py-1 rounded z-30 whitespace-nowrap">
              Add To Cart
            </div>
          </button>

          <button aria-label="Add to wishlist" className="cursor-pointer group">
            <Heart className="text-primary hover:text-input" />
            <div className="absolute -top-6 left-[25%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-black/80 text-xs px-2 py-1 rounded z-30 whitespace-nowrap">
              Add To Favorite
            </div>
          </button>

          <button aria-label="Contact on WhatsApp" className="cursor-pointer group">
            <FaWhatsapp size={22} className="text-primary hover:text-input" />
            <div className="absolute -top-6 right-[20%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-black/80 text-xs px-2 py-1 rounded z-30 whitespace-nowrap">
              Order On Whatsapp
            </div>
          </button>

          <BuyDialog id={product._id.toString()}>
            <button className="cursor-pointer group">
              <ShoppingBag className="text-primary hover:text-input" />
              <div className="absolute -top-6 right-[3%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-black/80 text-xs px-2 py-1 rounded z-30 whitespace-nowrap">
                Buy Now
              </div>
            </button>
          </BuyDialog>
        </div>
      </div>

      {/* Product Info */}
      <CardHeader className="text-xl relative">
        <Link href={`/product/${product._id}`} className="w-full h-full absolute inset-0 z-10" aria-label="View product details" />
        <CardTitle className='text-primary'>{product.name}</CardTitle>
       
  <p className="text-sm text-gray-800">Product Code: {product.productCode}</p>

        <CardDescription className="text-pretty">
          {product.description.length > 50
            ? `${product.description.slice(0, 50)}...`
            : product.description}
        </CardDescription>
        <span className="text-xl text-primary font-medium">£{product.price}</span>
      </CardHeader>
    </Card>
  );
};

export default Item;
