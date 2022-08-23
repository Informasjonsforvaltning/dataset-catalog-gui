import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReactReduxProvider} from 'react-redux';
import store from '../src/store'
import Router from '../src/router'

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <Router />
    </ReactReduxProvider>
  </React.StrictMode>
);