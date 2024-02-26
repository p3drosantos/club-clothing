import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUp from "./pages/sign-up/sign-up.page";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/userContext";

function App() {
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user;
    if (isSigningOut) {
      return logoutUser();
    }

    const isSigningIn = !isAuthenticated && user;

    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );

      const useFromFireStore = querySnapshot.docs[0]?.data();

      return loginUser(useFromFireStore as any);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
