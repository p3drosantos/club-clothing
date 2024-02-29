import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converters/firestore.converters";
import { BiChevronLeft } from "react-icons/bi";

import Category from "../types/category.types";
import Loading from "../loading/Loading";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

interface CategoryDetailsProps {
  categoryId: string;
}

const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate(-1);
  };

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(
          query(
            collection(db, "categories").withConverter(categoryConverter),
            where("id", "==", categoryId)
          )
        );

        const categories = querySnapshot.docs[0]?.data();

        setCategory(categories);
      } catch (error) {
        console.log("Error getting documents: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
    console.log(category);
  }, []);

  {
    isLoading && <Loading />;
  }

  return (
    <div className="py-5 px-10 flex flex-col">
      <div className="flex items-center">
        <div className="pt-[3px]">
          <BiChevronLeft
            onClick={handleArrowClick}
            className="cursor-pointer"
            size={30}
          />
        </div>
        <p className="text-xl font-semibold">
          Explorar {category?.displayName}
        </p>
      </div>
      <div className="grid grid-cols-4 justify-items-start  gap-5 mt-2">
        {category?.products.map((product) => (
          <div>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
