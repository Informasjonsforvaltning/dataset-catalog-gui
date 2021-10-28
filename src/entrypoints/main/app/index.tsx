import React, { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '@fellesdatakatalog/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import env from '../../../env';

import AuthProvider from '../../../providers/auth';
import TranslationsProvider from '../../../providers/translations';

import store from '../redux/store';

import GlobalStyles from '../styles';

import Router from '../router';

const { FDK_CMS_BASE_URI } = env;

const client = new ApolloClient({
  uri: `${FDK_CMS_BASE_URI}/graphql`,
  cache: new InMemoryCache()
});

const App: FC = () => (
  <ThemeProvider>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <CookiesProvider>
        <AuthProvider>
          <TranslationsProvider>
            <ReduxProvider store={store}>
              <Router />
            </ReduxProvider>
          </TranslationsProvider>
        </AuthProvider>
      </CookiesProvider>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
