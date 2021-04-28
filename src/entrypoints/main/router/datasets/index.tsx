import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import IdleTimer from 'react-idle-timer';

import { withAuth, Props as AuthProps } from '../../../../providers/auth';

import ProtectedRoute from '../../../../components/protected-route';

const pages = {
  datasets: lazy(() => import('./pages/datasets-page')),
  dataset: lazy(() => import('./pages/dataset-page'))
};

interface RouteParams {
  catalogId: string;
}

interface Props extends AuthProps {}

const DatasetsRouter: FC<Props> = ({ authService }) => {
  const { path } = useRouteMatch();
  const { catalogId } = useParams<RouteParams>();

  const isAuthorised =
    authService.isAuthenticated() &&
    (authService.hasSystemAdminPermission() ||
      (authService.hasOrganizationReadPermission(catalogId) &&
        authService.hasAcceptedLatestTermsAndConditions(catalogId)));

  const signOut = () => authService.signOut();

  const component = () => (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path={path} component={pages.datasets} />
        <Route exact path={`${path}/:datasetId`} component={pages.dataset} />
        <Redirect to='/catalogs' />
      </Switch>
      <IdleTimer
        element={document}
        onIdle={signOut}
        timeout={27.5 * 60 * 1000}
        debounce={5000}
      />
    </Suspense>
  );

  const fallback = () => <Redirect to='/catalogs' />;

  return (
    <ProtectedRoute
      path={path}
      component={component}
      fallback={fallback}
      isAuthorised={isAuthorised}
    />
  );
};

export default compose<FC>(memo, withAuth)(DatasetsRouter);
