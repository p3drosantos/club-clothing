import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";

import validator from "validator";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { BsGoogle } from "react-icons/bs";
import {
  signInWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, googleAuthProvider } from "../../config/firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log({ userCredentials });
    } catch (error) {
      const _error = error as AuthError;
      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        return setError("email", {
          type: "invalidCredentials",
          message: "E-mail ou senha inválidos.",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleAuthProvider);

      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("id", "==", userCredentials.user.uid)
        )
      );

      const user = querySnapshot.docs[0]?.data();

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(" ")[0];
        const lastName = userCredentials.user.displayName?.split(" ")[1];

        await addDoc(collection(db, "users"), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: "google",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center w-[450px] gap-5">
          <p className=" font-bold text-xl">Entre com a sua conta</p>
          <Button
            onClick={handleGoogleLogin}
            startIcon={<BsGoogle size={18} />}
          >
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
