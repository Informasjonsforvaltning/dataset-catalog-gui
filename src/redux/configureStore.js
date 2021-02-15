import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { getConfig } from '../config';

export function configureStore() {
  const saga = createSagaMiddleware({ context: {} });

  const middlewares = [thunk, saga];

  if (getConfig().store.useLogger) {
    middlewares.push(createLogger());
  }

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, /* preloadedState, */ enhancer);
  store.dispatch({ type: 'STORE_INIT' });

  saga.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      /* eslint-disable-next-line global-require */
      store.replaceReducer(require('./rootReducer').default);
    });
  }

  return store;
}
