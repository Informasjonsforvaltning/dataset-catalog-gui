import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { ThemeProfile } from '@fellesdatakatalog/theme';

import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE } from '../actions';
import { authService } from '../../utils/authentication/auth-service';
import env from '../../utils/constants/env';

const { SKE_THEME_PROFILE } = env;

const getThemeProfile = () =>
  authService.getResourceRoles().some(({ resourceId }) => SKE_THEME_PROFILE?.split(',').includes(resourceId)) ||
  !!localStorage.getItem('skeProfile')
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;

const initialState: STATE = { theme: getThemeProfile() };

// Context
const Context = React.createContext(initialState);
Context.displayName = 'GlobalContext';

// Context updater
const ContextDispatch = React.createContext<React.Dispatch<ACTION>>(() => {});
Context.displayName = 'GlobalContextDispatch';

// custom hooks
const useGlobalContext = () => useContext(Context);
const useGlobalDispatch = () => useContext(ContextDispatch);

const GlobalContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.CHANGE_THEME, payload: { theme: getThemeProfile() }});
  }, [authService.isInitialized()])

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default GlobalContext;
export { useGlobalContext, useGlobalDispatch };
