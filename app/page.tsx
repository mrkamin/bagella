/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
import Item from '@/components/Item';

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bagella-db`, {
    cache: "no-store", // or "force-cache" depending on your preference
  });
  const products = await res.json();

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='font-semibold text-left text-3xl'>Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {
          products.map((product: any) => (
            <Item product={product} key={product._id.toString()} />
          ))
        }
      </div>
    </div>
  );
};

export default Page;
