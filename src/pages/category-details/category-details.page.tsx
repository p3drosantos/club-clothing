import { useParams } from "react-router-dom";
import CategoryDetails from "../../components/CategoryDetails";
import Header from "../../components/Header";

const CategoryDetailsPage = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <>
      <Header />
      <CategoryDetails categoryId={id} />
    </>
  );
};

export default CategoryDetailsPage;
