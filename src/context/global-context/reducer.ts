import { ACTION, ACTION_TYPE } from '../actions';
import { produce } from 'immer';
import { ThemeProfile } from '@fellesdatakatalog/theme';

type STATE = { theme: ThemeProfile };

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_THEME:
      state.theme = action.payload.theme;
      return state;
    default:
      return state;
  }
});

export { STATE, reducer };
