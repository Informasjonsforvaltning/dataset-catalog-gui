import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/pages/main';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/dataset-catalogs'} element={<Main />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
