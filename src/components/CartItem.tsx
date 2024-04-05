import CartProduct from "../types/cart.types";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch } from "react-redux";
import {
  decreaseCartProductQuantity,
  increaseCartProductQuantity,
  removeProductFromCart,
} from "../store/reducers/cart/cart.action";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    dispatch(removeProductFromCart(product.id));
  };

  const handleIncreaseProductQuantity = () => {
    dispatch(increaseCartProductQuantity(product.id));
  };

  const handleDecreaseProductQuantity = () => {
    dispatch(decreaseCartProductQuantity(product.id));
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
          <AiOutlineMinus
            onClick={handleDecreaseProductQuantity}
            className="text-xl cursor-pointer"
          />
          <p className="px-2">{product.quantity}</p>
          <AiOutlinePlus
            onClick={handleIncreaseProductQuantity}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <RiDeleteBin6Line
          onClick={handleRemoveProduct}
          className="text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CartItem;
