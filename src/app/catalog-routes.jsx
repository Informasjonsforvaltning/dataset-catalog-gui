import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DatasetsListPage } from '../pages/dataset-list-page/dataset-list-page';
import { DatasetRegistrationPage } from '../pages/dataset-registration-page/dataset-registration-page';

export const CatalogRoutes = () => (
  <Switch>
    <Route
      exact
      path="/catalogs/:catalogId/datasets"
      component={DatasetsListPage}
    />
    <Route
      exact
      path="/catalogs/:catalogId/datasets/:datasetId"
      component={DatasetRegistrationPage}
    />
    <Redirect to="/catalogs" />
  </Switch>
);
