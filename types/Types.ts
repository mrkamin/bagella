export interface ProductType {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    productCode: string;
  }

  export type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  };
  
  export interface ProductProps {
    product: ProductType;
  }

  export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalAmount: number;
  };

  export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    popularity?: number;
  };

  export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  productCode: string;
  quantity: number;
}

export type BuyProps =
  | { id: string; items?: never; totalAmount?: never } // single item
  | { items: CartItem[]; totalAmount: number; id?: never }; // cart

export interface ItemType {
  name: string;
  image: string;
  price: number;
  quantity: number;
}