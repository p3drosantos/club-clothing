import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { toggleCart } from "../store/toolkit/cart/cart.slice";
import { selectProductsTotalPrice } from "../store/reducers/cart/cart.selectors";

const Cart = () => {
  const { isOpen, products } = useAppSelector(
    (rootReducer) => rootReducer.cartReducer
  );

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoToCheckout = () => {
    navigate("/checkout");
    dispatch(toggleCart() as any);
  };

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart() as any);
  };

  return (
    <div
      className={`fixed h-[100vh] w-[100vw] right-0 bottom-0 top-0 left-0 bg-blackrgba flex  justify-end  ${
        isOpen ? "opacity-100 visible " : "opacity-0 hidden"
      }`}
    >
      <div onClick={handleEscapeAreaClick} className="w-full"></div>
      <div className="h-full lg:min-w-[500px] min-w-[85%] z-200 bg-white p-5 overflow-scroll">
        {products.length === 0 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className=" font-bold text-xl">Seu Carrinho</p>
              <p onClick={toggleCart as any} className="hover:cursor-pointer">
                <IoMdClose size={25} />
              </p>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src="/Cart-Image.png"
                alt="empty-cart"
                className="lg:h-[180px] h-[100px]"
              />
              <p className="font-semibold lg:text-xl">
                O carrinho de compras está vazio.
              </p>
              <p className=" text-nowrap ">
                faça login para ver o seu carrinho.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className=" font-bold text-xl">Seu Carrinho</p>
              <p onClick={toggleCart as any} className="hover:cursor-pointer">
                <IoMdClose size={25} />
              </p>
            </div>
            {products.map((product) => (
              <CartItem product={product} />
            ))}
            <p className="font-bold text-lg mb-4 mt-1">
              Total:R${productsTotalPrice}
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
