import { BsCart3 } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleCreateAccount = () => {
    navigate("/sign-up");
  };

  return (
    <div className="flex justify-between px-3 py-4 bg-[#212529] text-white items-center ">
      <div className="hover:cursor-pointer">
        <h2 className="text-2xl font-bold" onClick={handleHome}>
          CLUB CLOTHING
        </h2>
      </div>
      <div className="flex gap-6 font-medium hover:cursor-pointer">
        <p>Explorar</p>
        <p onClick={handleLogin}>Login</p>
        <p onClick={handleCreateAccount}>Criar Conta</p>
        <div className="flex gap-1">
          <BsCart3 size={24} /> 5
        </div>
      </div>
    </div>
  );
};

export default Header;
