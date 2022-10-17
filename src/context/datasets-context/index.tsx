import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';

import { getDatasets } from './api-front-back';
import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE, STATUS } from '../actions';

const initialState: STATE = { status: STATUS.IDLE, catalogId: '', datasets: [] };

// Context
const Context = React.createContext(initialState);
Context.displayName = 'DatasetsContext';

// Context updater
const ContextDispatch = React.createContext<React.Dispatch<ACTION>>(() => {});
Context.displayName = 'DatasetsContextDispatch';

// custom hooks
const useDatasetsContext = () => useContext(Context);
const useDatasetsDispatch = () => useContext(ContextDispatch);

const DatasetsContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // initialize datasets
  const asyncDispatch = () => {
    if (state.catalogId) {
      dispatch({ type: ACTION_TYPE.LOADING });
      getDatasets(state.catalogId)
        .then(datasets => {
          dispatch({ type: ACTION_TYPE.FINISHED, payload: datasets });
        })
        .catch(err => {
          dispatch({ type: ACTION_TYPE.ERROR });
          console.error('DatasetsContext failed on getDatasets()!', err);
        });
    }
  };

  useEffect(asyncDispatch, [state.catalogId]);

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default DatasetsContext;
export { useDatasetsContext, useDatasetsDispatch };
