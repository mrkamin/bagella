import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import { ProductType } from '@/types/Types';
import { Button } from './ui/button';

interface ProductProps {
  product: ProductType;
}
const Item = ({product}: ProductProps) => {
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
      <CardFooter className='flex bottom-0 pb-5 relative justify-between'>
        <span className='text-xl text-primary font-medium'>
        £{product.price}
        </span>
        <Button>Purchase</Button>
      </CardFooter>
    </Card>
  )
}

export default Item
