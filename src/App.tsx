import { Routes, Route } from "react-router-dom";
import "./shared/style/main.scss";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";

import { NotFound } from "./components/errors/404";
import PrivateRoute from "./components/login/login-checker";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<PrivateRoute />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
