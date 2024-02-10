import { BsCart3 } from "react-icons/bs";

const Header = () => {
  return (
    <div className="flex justify-between px-3 py-4 bg-[#212529] text-white items-center">
      <div>
        <h2 className="text-2xl font-bold">CLUB CLOTHING</h2>
      </div>
      <div className="flex gap-6 font-medium">
        <p>Explorar</p>
        <p>Login</p>
        <p>Criar Conta</p>
        <div className="flex gap-1">
          <BsCart3 size={24} /> 5
        </div>
      </div>
    </div>
  );
};

export default Header;
