import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import Button from "./Button";

const Cart = () => {
  const { isOpen, toggleCart } = useContext(CartContext);

  return (
    <div
      className={`fixed h-[100vh] w-[100vw] right-0 bottom-0 top-0 left-0 bg-blackrgba flex  justify-end  ${
        isOpen ? "opacity-100 visible " : "opacity-0 hidden"
      }`}
    >
      <div onClick={toggleCart} className="w-full"></div>
      <div className="h-full min-w-[500px] z-200 bg-white p-5 overflow-scroll">
        <p className=" font-bold text-xl mb-4">Seu Carrinho</p>
        {/* items do carrinho */}
        <p className="font-bold text-lg mb-4">Total:R$1000</p>

        <Button startIcon={<MdOutlineShoppingCartCheckout />}>
          ir para o Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
