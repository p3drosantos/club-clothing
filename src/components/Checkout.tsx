import { useState } from "react";
import CartItem from "./CartItem";
import Button from "./Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from "axios";
import Loading from "../loading/Loading";
import { useAppSelector } from "../hooks/redux.hooks";
import { selectProductsTotalPrice } from "../store/reducers/cart/cart.selectors";

const Checkout = () => {
  const { products } = useAppSelector((state) => state.cartReducer);
  const totalPriceProducts = useAppSelector(selectProductsTotalPrice);

  const [loading, setLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          products,
        }
      );
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
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
              <Button
                onClick={handleFinishPurchaseClick}
                startIcon={<MdOutlineShoppingCartCheckout />}
              >
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
    </>
  );
};

export default Checkout;
