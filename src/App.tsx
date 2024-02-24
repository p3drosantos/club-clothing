import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUp from "./pages/sign-up/sign-up.page";

function App() {
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
