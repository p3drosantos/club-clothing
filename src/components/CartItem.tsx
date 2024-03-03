import { useContext } from "react";
import CartProduct from "../types/cart.types";

import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { CartContext } from "../contexts/cartContext";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { removeProduct, increaseProductQuantity } = useContext(CartContext);

  const handleRemoveProduct = () => {
    removeProduct(product.id);
  };

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product.id);
  };

  return (
    <div className="flex w-full py-2">
      <div>
        <img
          className="h-[180px] w-[140px] object-cover rounded-[10px] shadow-custom"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="flex-1 flex flex-col px-3 justify-center">
        <p className=" text-base font-bold">{product.name}</p>
        <p className="text-base font-semibold">R${product.price}</p>
        <div className="flex mt-2 items-center">
          <AiOutlineMinus className="text-xl cursor-pointer" />
          <p className="px-2">{product.quantity}</p>
          <AiOutlinePlus
            onClick={handleIncreaseProductQuantity}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <AiOutlineClose
          onClick={handleRemoveProduct}
          className="text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CartItem;
