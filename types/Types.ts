export interface ProductType {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
  }

  export type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  };
  
  export type BuyProps = {
    id: string;
  };

  export interface ProductProps {
    product: ProductType;
  }

  export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  
  export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalAmount: number;
  };