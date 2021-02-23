import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';

import { authService } from '../services/auth/auth-service';

interface Props extends RouteComponentProps {
  check: (params: any) => boolean;
  computedMatch: any;
}

export const ProtectedRoute = ({ check, ...props }: Props) => {
  const {
    computedMatch: { params }
  } = props;

  if (!authService.isAuthenticated() || !check(params)) {
    authService.login();
    return null;
  }

  if (
    !authService.hasSystemAdminPermission() &&
    !authService.hasAcceptedLatestTermsAndConditions(params.catalogId)
  ) {
    return <Redirect to="/catalogs" />;
  }

  const logOut = () => authService.logout();

  return (
    <>
      <Route {...props} />
      <IdleTimer
        element={document}
        onIdle={logOut}
        timeout={27.5 * 60 * 1000}
        debounce={5000}
      />
    </>
  );
};
