import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";

interface GuardAuthenticationProps {
  children: React.ReactNode;
}

const GuardAuthentication = ({ children }: GuardAuthenticationProps) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="Faça login para acessar esta página. Você será redirecionado para página de login em instantes..." />
      </>
    );
  }

  return <>{children}</>;
};

export default GuardAuthentication;
