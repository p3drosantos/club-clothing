import Category from "../types/category.types";
import ProductItem from "./ProductItem";

interface CategoryOverViewProps {
  category: Category;
}

const CategoryOverView = ({ category }: CategoryOverViewProps) => {
  return (
    <div>
      <div className="flex flex-col w-full mt-5">
        <p className=" font-bold text-xl lg:mb-[10px] lg:items-start lg:justify-start flex items-center justify-center mb-[15px]">
          {category.displayName}
        </p>
        <div className="flex flex-wrap w-full lg:justify-between items-center justify-center gap-10">
          {category.products.slice(0, 4).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryOverView;
