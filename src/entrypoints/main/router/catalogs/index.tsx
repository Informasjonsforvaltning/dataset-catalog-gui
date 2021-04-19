import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';

const pages = {
  overview: lazy(() => import('./pages/overview-page'))
};

const CatalogsRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={url} component={pages.overview} />
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(CatalogsRouter);
