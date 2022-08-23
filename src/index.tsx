import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReactReduxProvider} from 'react-redux';
import store from '../src/store' 
import App from './components/app/App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <App />
    </ReactReduxProvider>
  </React.StrictMode>
);