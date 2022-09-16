import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/main';
import MainPage from '../components/pages/main-page';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/dataset-catalogs'} element={<Main />}>
        <Route path=':id' element={<MainPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
