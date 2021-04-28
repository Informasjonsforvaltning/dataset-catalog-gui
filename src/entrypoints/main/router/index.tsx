import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import {
  BrowserRouter,
  Router as BaseRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import type { History } from 'history';

import Header from '../../../components/header';
import Root from '../../../components/root';
import Footer from '../../../components/footer';

const routes = {
  catalogs: lazy(() => import('./catalogs')),
  datasets: lazy(() => import('./datasets'))
};

interface Props {
  history?: History;
}

const Router: FC<Props> = ({ history }) => {
  const AppRouter: FC = ({ children }) =>
    history ? (
      <BaseRouter history={history}>{children}</BaseRouter>
    ) : (
      <BrowserRouter>{children}</BrowserRouter>
    );

  return (
    <AppRouter>
      <Header />
      <Root>
        <Suspense fallback={null}>
          <Switch>
            <Route
              path='/catalogs/:catalogId/datasets'
              component={routes.datasets}
            />
            <Route path='/catalogs' component={routes.catalogs} />
            <Redirect to='/catalogs' />
          </Switch>
        </Suspense>
      </Root>
      <Footer />
    </AppRouter>
  );
};

export default compose<FC>(memo)(Router);
