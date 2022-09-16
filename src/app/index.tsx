import React, { FC, StrictMode } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';

import AppContext from '../context/main-context';
import Router from '../router';
import AuthWrapper from '../utils/authentication/auth-wrapper';
import SC from './styled';

const App: FC = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <SC.App>
          <AuthWrapper>
            <AppContext>
              <Router />
            </AppContext>
          </AuthWrapper>
        </SC.App>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
