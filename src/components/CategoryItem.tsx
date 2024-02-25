import { FunctionComponent } from "react";

import Category from "../types/category.types";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
  const backgroundImageStyle = {
    backgroundImage: `url('${category.imageUrl}')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%", // Definir altura como 100%
  };
  return (
    <div
      className="flex items-center justify-center w-full gap-15 bg-cover bg-no-repeat bg-center rounded-lg shadow-md bg-opacity-30 blend-color sm:px-50 sm:h-300"
      style={backgroundImageStyle}
    >
      <div className=" text-white text-center bg-opacity-30 bg-primaryInput py-[10px] px-[30px] rounded-lg border-1 border-primaryDark border  shadow-md transition duration-500 ease-in-out hover:bg-opacity-55 cursor-pointer">
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </div>
    </div>
  );
};

export default CategoryItem;
