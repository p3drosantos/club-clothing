import { createContext, useState } from "react";

import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  toggleCart: () => void;
  addProduct: (product: Product) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isOpen: false,
  toggleCart: () => {},
  addProduct: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContextProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  const addProduct = (product: Product) => {
    setProducts((prevState) => {
      const productAlreadyInCart = prevState.find(
        (cartProduct) => cartProduct.id === product.id
      );

      if (productAlreadyInCart) {
        return prevState.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
        );
      }

      return [...prevState, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ products, isOpen, toggleCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;