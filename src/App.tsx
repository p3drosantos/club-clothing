import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUp from "./pages/sign-up/sign-up.page";
import ExplorePage from "./pages/explore/explore.page";
import CategoryDetailsPage from "./pages/category-details/category-details.page";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/userContext";
import { userConverter } from "./converters/firestore.converters";

import Loading from "./loading/Loading";
import Cart from "./components/Cart";
import CheckouPage from "./pages/checkout/checkout.page";
import GuardAuthentication from "./guards/guards.authentication";

function App() {
  const [isInitialized, setIsInitialized] = useState(true);
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user;
    if (isSigningOut) {
      logoutUser();
      return setIsInitialized(false);
    }

    const isSigningIn = !isAuthenticated && user;

    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid)
        )
      );

      const useFromFireStore = querySnapshot.docs[0]?.data();

      loginUser(useFromFireStore);

      return setIsInitialized(false);
    }

    setIsInitialized(false);
  });

  if (isInitialized) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/checkout"
          element={
            <GuardAuthentication>
              <CheckouPage />
            </GuardAuthentication>
          }
        />
      </Routes>
      <Cart />
    </BrowserRouter>
  );
}

export default App;
