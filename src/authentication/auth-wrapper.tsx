/**
 * This component holds the logic for deciding whether or not you need to,
 * log in via sso, based on the environment you are in.
 * development: you don't need to log in
 * production: you will be redirected to the sso login page
 */
import React, { FC, PropsWithChildren } from 'react';

import AuthProvider from './auth-provider';
import { CookiesProvider } from 'react-cookie';

import env from '../utils/constants/env';
import { Namespace } from '../utils/constants/enums';

const { NAMESPACE } = env;

const AuthWrapper: FC<PropsWithChildren> = ({ children }) =>
  NAMESPACE === Namespace.DEVELOPMENT ? (
    <>{children}</>
  ) : (
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookiesProvider>
  );

export default AuthWrapper;
