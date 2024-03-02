import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import Product from "../types/product.types";

import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const backgroundImageStyle = {
    backgroundImage: `url('${product.imageUrl}')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "380px",
    width: "300px",

    // Definir altura como 100% h-[380px] w-[300px]
  };

  const { addProduct } = useContext(CartContext);

  const handleAddProduct = () => {
    addProduct(product);
  };

  return (
    <div className="flex flex-col">
      <div
        className="rounded-[10px] shadow-custom relative"
        style={backgroundImageStyle}
      >
        <div className="group absolute w-full  bg-black/60 rounded-[10px] opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="absolute w-full h-full bg-black/60 rounded-[10px] opacity-0 hover:opacity-100 p-5 flex flex-col justify-end transition-opacity duration-300">
          <Button
            startIcon={<MdOutlineShoppingCartCheckout />}
            onClick={handleAddProduct}
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
      <div className="flex mt-1 justify-between">
        <p className="font-medium text-[1rem]">{product.name}</p>
        <p className="font-medium text-[1rem]">R${product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
