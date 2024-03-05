import { createContext, useState } from "react";

import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  totalPriceProducts: number;
  totalItems: number;
  toggleCart: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isOpen: false,
  totalPriceProducts: 0,
  totalItems: 0,
  toggleCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
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

  const removeProduct = (productId: string) => {
    setProducts((prevState) =>
      prevState.filter((cartProduct) => cartProduct.id !== productId)
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevState) =>
      prevState.map((cartProduct) =>
        cartProduct.id === productId
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      )
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevState) =>
      prevState
        .map((cartProduct) =>
          cartProduct.id === productId
            ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
            : cartProduct
        )
        .filter((cartProduct) => cartProduct.quantity > 0)
    );
  };

  const totalPriceProducts = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const totalItems = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        products,
        isOpen,
        totalPriceProducts,
        totalItems,
        toggleCart,
        addProduct,
        removeProduct,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
