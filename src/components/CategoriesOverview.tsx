import { useContext, useEffect } from "react";
import { CategoryContext } from "../contexts/categoryContext";
import CategoryOverView from "./CategoryOverview";

const CategoriesOverView = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <div className="flex flex-col py-5 px-10 lg:px-20">
      {categories.map((category) => (
        <CategoryOverView key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesOverView;
