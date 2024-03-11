import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import CartItem from "./CartItem";
import Button from "./Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Checkout = () => {
  const { products, totalPriceProducts } = useContext(CartContext);

  return (
    <div className="flex flex-col items-center py-8 overflow-hidden">
      <p className=" text-xl font-bold">Checkout</p>
      {products.length > 0 ? (
        <>
          <div
            className={`min-w-[650px] h-[480px] overflow-y-scroll my-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scrollbar ${
              products.length <= 2 && "scrollbar-none"
            }`}
          >
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <div className="flex flex-col min-w-[650px]">
            <p className="text-xl font-bold pb-5">
              Total: ${totalPriceProducts}
            </p>
            <Button startIcon={<MdOutlineShoppingCartCheckout />}>
              Finalizar Compra
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-[500px} h-[500px]">
          <p className=" font-normal text-xl">Seu carrinho está vazio!</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
