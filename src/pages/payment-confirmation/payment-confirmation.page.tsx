import { useNavigate, useSearchParams } from "react-router-dom";

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from "react-icons/ai";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCartProducts } from "../../store/reducers/cart/cart.action";

const PaymentConfirmation = () => {
  const dispatch = useDispatch();

  const [SearchParams] = useSearchParams();

  const status = SearchParams.get("success");
  const isCanceled = SearchParams.get("canceled") === "true";

  useEffect(() => {
    if (status === "true") {
      dispatch(clearCartProducts());
    }
  }, [status, dispatch]);

  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="w-[500px] flex flex-col items-center">
          {status === "true" && (
            <>
              <AiOutlineCheckCircle className=" text-success" size={120} />
              <p className="my-4 font-semibold text-xl">
                Sua compra foi finalizada com sucesso!
              </p>
            </>
          )}

          {(status === "false" || isCanceled) && (
            <>
              <AiOutlineCloseCircle className=" text-error" size={120} />
              <p className="my-4 font-semibold text-xl">
                Algo deu errado com sua compra, tente novamente.
              </p>
            </>
          )}
          <Button onClick={handleHomeButtonClick} startIcon={<AiOutlineHome />}>
            Ir para a Página inicial
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmation;
