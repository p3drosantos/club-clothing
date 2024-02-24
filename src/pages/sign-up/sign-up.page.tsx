import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";

import validator from "validator";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../../config/firebase.config";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await addDoc(collection(db, "users"), {
        id: userCredentials.user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch("password");

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-[450px] gap-4">
          <p className="border-b border-solid border-primaryGray text-xl font-bold w-full items-center justify-center flex pb-5">
            Crie a sua conta
          </p>
          <div className="flex flex-col w-full">
            <p className="font-semibold mb-1">Nome</p>
            <Input
              hasError={!!errors.firstName}
              errorMessage={errors.firstName?.message?.toString()}
              placeholder="Digite seu nome"
              type="text"
              {...register("firstName", {
                required: { value: true, message: "O nome é obrigatório." },
                minLength: {
                  value: 3,
                  message: "O nome deve ter no mínimo 3 caracteres.",
                },
                validate: (value) =>
                  validator.isAlpha(value) || "Nome inválido.",
              })}
            />
            <p className="font-semibold mb-1">Sobrenome</p>
            <Input
              hasError={!!errors.lastName}
              errorMessage={errors.lastName?.message?.toString()}
              placeholder="Digite seu sobrenome"
              type="text"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "O sobrenome é obrigatório.",
                },
                minLength: {
                  value: 3,
                  message: "O sobrenome deve ter no mínimo 3 caracteres.",
                },
                validate: (value) =>
                  validator.isAlpha(value) || "Sobrenome inválido.",
              })}
            />
            <p className="font-semibold mb-1">E-mail</p>
            <Input
              hasError={!!errors.email}
              errorMessage={errors.email?.message?.toString()}
              placeholder="Digite seu e-mail"
              type="email"
              {...register("email", {
                required: { value: true, message: "O e-mail é obrigatório." },
                validate: (value) =>
                  validator.isEmail(value) ||
                  "O e-mail deve ser um e-mail válido.",
              })}
            />
            <p className="font-semibold mb-1">Senha</p>
            <Input
              hasError={!!errors.password}
              errorMessage={errors.password?.message?.toString()}
              placeholder="Digite sua senha"
              type="password"
              {...register("password", {
                required: { value: true, message: "A senha é obrigatória." },
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres.",
                },
              })}
            />
            <p className="font-semibold mb-1">Confirme a senha</p>
            <Input
              hasError={!!errors.passwordConfirmation}
              errorMessage={errors.passwordConfirmation?.message?.toString()}
              placeholder="Confirme sua senha"
              type="password"
              {...register("passwordConfirmation", {
                required: {
                  value: true,
                  message: "A confirmação de senha é obrigatória.",
                },
                validate: (value) =>
                  value === password || "As senhas não coincidem.",
              })}
            />
            <Button
              onClick={() => handleSubmit(onSubmit)()}
              startIcon={<FiLogIn size={18} />}
            >
              Criar conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
