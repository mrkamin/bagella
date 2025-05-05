import { stripe } from "@/lib/Stripe"
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TickIcon from "@/components/ui/Tickicon";

interface PageProps  {
  searchParams: {session_id?: string};
}

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve
    (sessionId);
    return session
  } catch (error) {
    console.log(error)
    return null;
  }
}

const page = async ({searchParams}: PageProps) => {
  const sessionId =  searchParams.session_id;
  if(!sessionId) {
    redirect("/")
  }
  const session = await getSession(sessionId)
  if (!session) {
    return <h1>Invalid session!</h1>
  }
  if (session?.status === "expired") {
    return <h1>Your session expired</h1>
  }
  if (session?.status === "open") {
    return <h1>Your payment is in Progress!</h1>
  }
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-12 h-12">
        <TickIcon />
      </div>
      <h1 className="text-2xl font-semibold">
        Payment Successful!
      </h1>
      <p className="text-lg max-w-md text-center">
        Hello {session.customer_details?.name}, Your order has been successfully
        placed! Expect delivery within 2-3 business days. Purchase
        Receipt is sent to your email: {session.customer_details?.email}
      </p>
      <Link href='/'>
        <Button>Go Home</Button>
      </Link>
      
    </div>
  )
}

export default page
