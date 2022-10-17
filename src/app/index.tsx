import React, { FC, StrictMode } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import { CookiesProvider } from 'react-cookie';

import AppContext from '../context/main-context';
import Router from '../router';
import SC from './styled';
import AuthProvider from '../utils/authentication/auth-provider';
import DatasetsContext from '../context/datasets-context';

const App: FC = () => {
  return (
    <StrictMode>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProvider>
            <SC.App>
              <AppContext>
                <DatasetsContext>
                  <Router />
                </DatasetsContext>
              </AppContext>
            </SC.App>
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </StrictMode>
  );
};

export default App;
