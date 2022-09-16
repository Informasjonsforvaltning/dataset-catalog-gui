import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/main';
import DatasetsPage from '../components/pages/datasets-page';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/dataset-catalogs'} element={<Main />}>
        <Route path=':id' element={<DatasetsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
