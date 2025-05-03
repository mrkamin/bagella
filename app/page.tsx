import { Button } from '@/components/ui/button'
import { getproducts } from './api/bagella-db/route'
import { notFound } from 'next/navigation';

const page = async() => {

  const products = await getproducts();

  if(!products){
    notFound();
  }
 
  return (
    <Button>Bagella</Button>
  )
}

export default page
