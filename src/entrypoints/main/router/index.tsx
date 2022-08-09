import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import {
  BrowserRouter,
  Router as BaseRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import type { History } from 'history';

import Header from '../../../components/header';
import Root from '../../../components/root';
import Footer from '../../../components/footer';
import env from '../../../env';

const { FDK_REGISTRATION_BASE_URI } = env;

const routes = {
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

  const redirectToRoot = () => {
    window.location.href = FDK_REGISTRATION_BASE_URI;
    return null;
  };

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
            <Route exact path='/catalogs' component={redirectToRoot} />
            <Route path='*'>
              <Redirect to='/catalogs' />
            </Route>
          </Switch>
        </Suspense>
      </Root>
      <Footer />
    </AppRouter>
  );
};

export default compose<FC>(memo)(Router);
