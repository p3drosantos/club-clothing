import { createContext, useState } from "react";
import Category from "../types/category.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converters/firestore.converters";

interface ICategoryContext {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  isLoading: boolean;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: async () => Promise.resolve(),
  isLoading: false,
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const CategoryContextProvider = ({ children }: UserContextProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);

      const categoriesFromFirestore: Category[] = [];
      const QuerySnapshot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter)
      );
      QuerySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });

      // console.log({ categoriesFromFirestore });
      setCategories(categoriesFromFirestore);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
