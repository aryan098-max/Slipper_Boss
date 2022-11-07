import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Auth from "./components/Auth";
import Home from "./components/Home";
import UserProvider from "./UserContext";
import Cart from "./components/Cart";
import OrderDone from "./components/OrderDone";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<Auth />} path="/auth" />
          <Route element={<Home />} path="/home" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<OrderDone />} path="/order-done" />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
