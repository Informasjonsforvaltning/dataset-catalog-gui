import React, { memo, ComponentType, FC, Fragment } from 'react';
import { compose } from 'redux';
import { Route, RouteProps } from 'react-router-dom';

interface ExternalProps extends RouteProps {
  isAuthorised: boolean;
  component?: ComponentType<any>;
  fallback?: ComponentType<any>;
}

interface Props extends ExternalProps {}

const ProtectedRoute: FC<Props> = ({
  isAuthorised,
  component = Fragment,
  fallback: Fallback = Fragment
}) => (isAuthorised ? <Route component={component} /> : <Fallback />);

export default compose<FC<ExternalProps>>(memo)(ProtectedRoute);
