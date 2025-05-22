"use client";
import { CartContextType, CartItem } from "@/types/Types";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const {user} = useUser()
  useEffect(() => {
    const storedCart = localStorage.getItem("goldenHandsCart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("goldenHandsCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      return prev.flatMap((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return [{ ...item, quantity: item.quantity - 1 }];
          }
          return []; // remove the item completely
        }
        return [item];
      });
    });
  };
  
  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); 

  const totalAmount = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalAmount, user }}>
      {children}
    </CartContext.Provider>
  );
};