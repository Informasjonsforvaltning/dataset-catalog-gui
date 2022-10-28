import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/page-main';
import DatasetsPage from '../pages/datasets-page';
import { routes } from './routes';
import EditDatasetPage from '../pages/edit-dataset-page';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.home} element={<Main />}>
        <Route index element={<DatasetsPage />} />
        <Route path={routes.dataset} element={<EditDatasetPage />} />
      </Route>
      <Route path='*' element={<h1>Routing Error ...</h1>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
