export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import React from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import { BrowserRouter } from 'react-router-dom';

export const decorators = [
  Story => (
    <ThemeProvider>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </ThemeProvider>
  ),
];
