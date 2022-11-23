import React, { FC, PropsWithChildren, useContext, useReducer, createContext } from 'react';

import { reducer, STATE } from './reducer';
import { ACTION } from '../actions';
import { useDatasetsContext } from '../datasets-context';

const initialState: STATE = {
  datasets: [],
  rows: [],
  headerColumns: [],
  sort: { sortBy: 'title', sortOrder: 'ascending' },
};

// Context
const Context = createContext(initialState);
Context.displayName = 'TableContext';

// Context updater
const ContextDispatch = createContext<React.Dispatch<ACTION>>(() => {});
Context.displayName = 'TableContextDispatch';

// custom hooks
const useTableContext = () => useContext(Context);
const useTableDispatch = () => useContext(ContextDispatch);

const TableContext: FC<PropsWithChildren> = ({ children }) => {
  const datasetsContext = useDatasetsContext();
  initialState.datasets = [...datasetsContext.datasets];
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default TableContext;
export { useTableContext, useTableDispatch };
