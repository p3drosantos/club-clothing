import { createContext, useEffect, useState } from "react";

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
  clearProducts: () => void;
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
  clearProducts: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const PRODUCTS_STORAGE_KEY = "@fsw-store/products";

const CartContextProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const localProductsCart = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (localProductsCart) {
      setProducts(JSON.parse(localProductsCart));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }, 0);
  }, [products]);

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

  const clearProducts = () => {
    setProducts([]);
  };

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
        clearProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
