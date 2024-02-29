import { useContext, useEffect } from "react";

import CategoryItem from "./CategoryItem";
import { CategoryContext } from "../contexts/categoryContext";
import Loading from "../loading/Loading";

const Categories = () => {
  const { categories, fetchCategories, isLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="h-full w-full">
      {isLoading && <Loading />}

      <div className="grid grid-cols-2 gap-4 py-[20px] px-[30px] h-[91vh]">
        {/* Renderizar a primeira e segunda fotos */}
        {categories.slice(0, 2).map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
        {/* Renderizar a terceira foto */}
        <div className="col-span-2">
          {categories.length > 2 && (
            <CategoryItem key={categories[2].id} category={categories[2]} />
          )}
        </div>
        {/* Renderizar a quarta e quinta fotos */}
        {categories.slice(3, 5).map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
