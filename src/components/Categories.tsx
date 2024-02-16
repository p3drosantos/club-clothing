import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

import Category from "../types/category.types";
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converters/firestore.converters";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = [];
      const QuerySnapshot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter)
      );
      QuerySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });

      console.log({ categoriesFromFirestore });
      setCategories(categoriesFromFirestore);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2 p-2 h-[91vh]">
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
