import { useEffect } from "react";
import CategoryOverView from "./CategoryOverview";
import { useAppSelector } from "../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../store/reducers/category/category.actions";
import Category from "../types/category.types";
import Loading from "../loading/Loading";

const CategoriesOverView = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories() as any);
    }
  }, [dispatch, categories]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col py-5 px-10 lg:px-20">
      {categories.map((category: Category) => (
        <CategoryOverView key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesOverView;
