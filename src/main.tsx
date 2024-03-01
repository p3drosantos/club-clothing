import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

import UserContextProvider from "./contexts/userContext.tsx";
import CategoryContextProvider from "./contexts/categoryContext.tsx";
import CartContextProvider from "./contexts/cartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <CategoryContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
