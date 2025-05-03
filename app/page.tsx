import Item from '@/components/Item';
import { getproducts } from './api/bagella-db/route'
import { notFound } from 'next/navigation';

const page = async() => {

  const products = await getproducts();

  if(!products){
    notFound();
  }
 
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='font-semibold text-left text-3xl'>Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {
          products.map((product) => (
            <Item product={product} key={product._id.toString()} />
          ))
        }
      </div>
    </div>
  )
}

export default page
