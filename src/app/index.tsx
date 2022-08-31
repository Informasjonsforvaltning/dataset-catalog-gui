import React, { FC, StrictMode } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';

import AppContext from '../context/main-context';
import Router from '../router';
import AuthWrapper from '../authentication/auth-wrapper';

const App: FC = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <AuthWrapper>
          <AppContext>
            <Router />
          </AppContext>
        </AuthWrapper>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
