"use client";

import { useSyncCart } from '@/hooks/useSyncCart'

const CartSyncProvider = () => {
    useSyncCart();
  return null;
}

export default CartSyncProvider
