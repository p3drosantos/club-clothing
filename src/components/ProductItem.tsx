import Product from "../types/product.types";
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

  return (
    <div className="flex flex-col">
      <div
        className="rounded-[10px] shadow-custom"
        style={backgroundImageStyle}
      ></div>
      <div className="flex mt-1 justify-between">
        <p className="font-medium text-[1rem]">{product.name}</p>
        <p className="font-medium text-[1rem]">R${product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
