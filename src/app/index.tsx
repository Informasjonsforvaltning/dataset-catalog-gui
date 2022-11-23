import React, { FC, StrictMode } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import { CookiesProvider } from 'react-cookie';

import Router from '../router';
import SC from './styled';
import AuthProvider from '../utils/authentication/auth-provider';
import DatasetsContext from '../context/datasets-context';
import TableContext from '../context/table-context';
import GlobalContext from '../context/global-context';

const App: FC = () => {
  return (
    <StrictMode>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProvider>
            <GlobalContext>
              <SC.App>
                <DatasetsContext>
                  <TableContext>
                    <Router />
                  </TableContext>
                </DatasetsContext>
              </SC.App>
            </GlobalContext>
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </StrictMode>
  );
};

export default App;
