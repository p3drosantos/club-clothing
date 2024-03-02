import CartProduct from "../types/cart.types";

import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
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
          <AiOutlinePlus className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <AiOutlineClose className="text-xl  cursor-pointer" />
      </div>
    </div>
  );
};

export default CartItem;
