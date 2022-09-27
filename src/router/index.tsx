import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/main';
import DatasetsPage from '../components/pages/datasets-page';
import { routes } from './routes';
import EditDatasetPage from "../components/pages/edit-dataset-page";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.home} element={<Main />}>
        <Route path={routes.catalogId} element={<DatasetsPage />} />
        <Route path={routes.datasetId} element={<EditDatasetPage />} />
      </Route>
      <Route path='*' element={<h1>Routing Error ...</h1>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
