import React, { FC, StrictMode } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import { CookiesProvider } from 'react-cookie';

import Router from '../router';
import SC from './styled';
import AuthProvider from '../utils/authentication/auth-provider';
import DatasetsContext from '../context/datasets-context';
import GlobalStyle from '../utils/styles/global-style';

const App: FC = () => {
  return (
    <StrictMode>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProvider>
            <GlobalStyle />
            <SC.App>
              <DatasetsContext>
                <Router />
              </DatasetsContext>
            </SC.App>
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </StrictMode>
  );
};

export default App;
