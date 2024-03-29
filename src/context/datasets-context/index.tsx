import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';

import { getDatasets, getOrganizationName } from './api-front-back';
import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE, STATUS } from '../actions';

const initialState: STATE = { status: STATUS.IDLE, catalogId: '', organizationName: '', datasets: [] };

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
          dispatch({ type: ACTION_TYPE.FINISHED, payload: datasets ?? [] });
        })
        .catch(error => {
          dispatch({ type: ACTION_TYPE.ERROR });
          console.error('DatasetsContext failed on getDatasets()!', error);
        });
        getOrganizationName(state.catalogId)
          .then(organizationName => {
            dispatch({ type: ACTION_TYPE.SET_ORGANIZATION_NAME, payload: organizationName ?? '' });
          })
          .catch(error => {
            dispatch({ type: ACTION_TYPE.ERROR });
            console.error('DatasetsContext failed on getOrganizationName()!', error);
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
