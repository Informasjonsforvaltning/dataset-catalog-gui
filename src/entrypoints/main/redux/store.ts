import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './reducer';
import RootSaga from './saga';

import AuthService from '../../../services/auth/auth-service';

const saga = createSagaMiddleware({
  context: {
    auth: AuthService
  }
});

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...[thunk, saga]))
);

saga.run(RootSaga);

(module as any).hot?.accept();

export default store;
