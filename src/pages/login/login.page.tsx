import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";

import validator from "validator";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { BsGoogle } from "react-icons/bs";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center w-[450px] gap-5">
          <p className=" font-bold text-xl">Entre com a sua conta</p>
          <Button startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </Button>
          <p className=" flex font-medium pb-4 border-b border-solid border-[#6c757d] w-full items-center justify-center">
            ou entre com o seu e-mail
          </p>
          <div className="flex flex-col w-full">
            <p className=" font-semibold mb-1">E-mail</p>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email", {
                required: { value: true, message: "e-mail é obrigatório." },
                validate: (value) =>
                  validator.isEmail(value) || "e-mail inválido.",
              })}
              hasError={!!errors.email}
              errorMessage={errors.email?.message?.toString()}
            />
            <p className=" font-semibold mb-1">Senha</p>
            <Input
              type="password"
              placeholder="Digite sua senha"
              {...register("password", {
                required: { value: true, message: "senha é obrigatória." },
                minLength: {
                  value: 6,
                  message: "senha deve ter no mínimo 6 caracteres.",
                },
              })}
              hasError={!!errors.password}
              errorMessage={errors.password?.message?.toString()}
            />
            <Button
              onClick={() => handleSubmit(onSubmit)()}
              startIcon={<FiLogIn size={18} />}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
