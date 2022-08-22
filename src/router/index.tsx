import React, { FC } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "../components/app/App";

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<h1>Not Found!</h1>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;