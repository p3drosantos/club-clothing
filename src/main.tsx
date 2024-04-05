import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// @ts-ignore
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

import "./index.css";

import UserContextProvider from "./contexts/userContext.tsx";
import CategoryContextProvider from "./contexts/categoryContext.tsx";
import CartContextProvider from "./contexts/cartContext.tsx";
import { store, persistedStore } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <UserContextProvider>
          <CategoryContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </CategoryContextProvider>
        </UserContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
