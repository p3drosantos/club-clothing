import { useEffect } from "react";

import CategoryItem from "./CategoryItem";
import Loading from "../loading/Loading";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../store/toolkit/category/category.slice";
import { useAppSelector } from "../hooks/redux.hooks";
import Category from "../types/category.types";

const Categories = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  return (
    <div className="h-full w-full">
      {isLoading && <Loading />}

      <div className="lg:grid lg:grid-cols-2 flex flex-col items-center gap-4 py-[20px] px-[30px] lg:h-[91vh] h-full">
        {/* Renderizar a primeira e segunda fotos */}
        {categories.slice(0, 2).map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
        {/* Renderizar a terceira foto */}
        <div className="lg:col-span-2 h-full">
          {categories.length > 2 && (
            <CategoryItem key={categories[2].id} category={categories[2]} />
          )}
        </div>
        {/* Renderizar a quarta e quinta fotos */}
        {categories.slice(3, 5).map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
