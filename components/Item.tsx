"use client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import { ProductProps } from '@/types/Types';
import { Button } from './ui/button';
import Link from 'next/link';
import { useCart } from '@/context/Cartcontext';
import Buy from './Buy';

const Item = ({product}: ProductProps) => {
  const { addToCart } = useCart();
  return (
    <Card className='flex flex-col p-0 relative m-0 overflow-hidden'>
      <div className='relative flex justify-center items-center h-60 bg-slate-100'>
        <Image 
          alt={product.name}
          width={300}
          height={300}
          src={product.image}
          className='object-contain max-h-60'
        />
      </div>
      <CardHeader className='text-xl'>
        <CardTitle>
          {product.name}
        </CardTitle>
        <CardDescription className='text-pretty'>
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex flex-col pb-5 gap-3'>
        <CardFooter className='!flex !justify-between w-full p-0 m-0'>
        <span className='text-xl text-primary font-medium'>
          £{product.price}
        </span>
        <Buy id={product._id.toString()} />
        </CardFooter>
      <CardFooter className='!flex !justify-between w-full p-0 m-0'>
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
        <Link href={`/product/${product._id}`}>
          <Button 
            className="cursor-pointer"
            aria-label="view-details"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
      </CardFooter>
    </Card>
  )
}

export default Item
