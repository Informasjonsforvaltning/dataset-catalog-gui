import { SET_INPUT_LANGUAGES, TOGGLE_INPUT_LANGUAGE } from './actionTypes';

import TranslationsService, { Language } from '../../../services/translations';

const initialState = {
  languages: [
    {
      code: Language.NB,
      title: TranslationsService.translate('lang.NO_NB'),
      selected: true
    },
    {
      code: Language.NN,
      title: TranslationsService.translate('lang.NO_NN'),
      selected: false
    },
    {
      code: Language.EN,
      title: TranslationsService.translate('lang.ENG'),
      selected: false
    }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INPUT_LANGUAGES: {
      const allowedLanguages = state.languages.map(({ code }) => code);
      const inputLanguages = action.payload.languages.filter(lang =>
        allowedLanguages.includes(lang)
      );

      return {
        ...state,
        languages: inputLanguages.length
          ? state.languages.map(({ code, title }) => ({
              code,
              title,
              selected: inputLanguages.includes(code)
            }))
          : initialState.languages
      };
    }
    case TOGGLE_INPUT_LANGUAGE: {
      return {
        ...state,
        languages: state.languages.map(({ code, title, selected }) => ({
          code,
          title,
          selected: code === action.payload.language ? !selected : selected
        }))
      };
    }
    default: {
      return state;
    }
  }
}
