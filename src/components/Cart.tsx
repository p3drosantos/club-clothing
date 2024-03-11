import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isOpen, toggleCart, products, totalPriceProducts } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate("/checkout");
    toggleCart();
  };

  return (
    <div
      className={`fixed h-[100vh] w-[100vw] right-0 bottom-0 top-0 left-0 bg-blackrgba flex  justify-end  ${
        isOpen ? "opacity-100 visible " : "opacity-0 hidden"
      }`}
    >
      <div onClick={toggleCart} className="w-full"></div>
      <div className="h-full min-w-[500px] z-200 bg-white p-5 overflow-scroll">
        {products.length === 0 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className=" font-bold text-xl">Seu Carrinho</p>
              <p onClick={toggleCart} className="hover:cursor-pointer">
                <IoMdClose size={25} />
              </p>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src="/Cart-Image.png"
                alt="empty-cart"
                className="h-[180px]"
              />
              <p className="font-semibold text-xl">
                O carrinho de compras está vazio.
              </p>
              <p>faça login para ver o seu carrinho e comece a comprar.</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className=" font-bold text-xl">Seu Carrinho</p>
              <p onClick={toggleCart} className="hover:cursor-pointer">
                <IoMdClose size={25} />
              </p>
            </div>
            {products.map((product) => (
              <CartItem product={product} />
            ))}
            <p className="font-bold text-lg mb-4 mt-1">
              Total:R${totalPriceProducts}
            </p>

            <Button
              startIcon={<MdOutlineShoppingCartCheckout />}
              onClick={handleGoToCheckout}
            >
              ir para o Checkout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
