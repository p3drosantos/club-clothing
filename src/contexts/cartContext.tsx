import { createContext, useState } from "react";

import CartProduct from "../types/cart.types";

interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isOpen: false,
  toggleCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContextProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <CartContext.Provider value={{ products, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
