import { signOut } from "firebase/auth";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { auth } from "../config/firebase.config";
import { CartContext } from "../contexts/cartContext";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );
  const { toggleCart, totalItems } = useContext(CartContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleCreateAccount = () => {
    navigate("/sign-up");
  };

  const handleExplore = () => {
    navigate("/explore");
  };

  const handleSignOut = () => {
    signOut(auth);
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <div className="flex justify-between px-3 py-4 bg-[#212529] text-white items-center ">
      <div className="hover:cursor-pointer">
        <h2 className="text-2xl font-bold" onClick={handleHome}>
          CLUB CLOTHING
        </h2>
      </div>
      <div className="flex gap-6 font-medium hover:cursor-pointer">
        <p onClick={handleExplore}>Explorar</p>
        {!isAuthenticated && (
          <>
            <p onClick={handleLogin}>Login</p>
            <p onClick={handleCreateAccount}>Criar Conta</p>
          </>
        )}
        {isAuthenticated && <p onClick={handleSignOut}>Sair</p>}
        <div className="flex gap-1">
          <BsCart3 onClick={toggleCart} size={24} /> {totalItems}
        </div>
      </div>
    </div>
  );
};

export default Header;
