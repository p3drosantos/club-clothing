import { createContext, useState } from "react";
import User from "../types/user.types";

interface IUserContext {
  currentUser: null | User;
  isAuthenticated: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}
export const UserContext = createContext<IUserContext>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAuthenticated = currentUser !== null;

  const loginUser = (user: User) => {
    return setCurrentUser(user);
  };

  const logoutUser = () => {
    return setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
