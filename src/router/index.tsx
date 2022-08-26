import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../components/app";

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={"/dataset-catalogs"} element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
