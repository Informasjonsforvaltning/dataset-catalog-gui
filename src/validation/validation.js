import isURL from 'is-url';

import TranslationsService from '../services/translations';

export const validateRequired = (
  nameOfObject,
  value,
  errors,
  useLangField = true
) => {
  if (!value) {
    errors[`${nameOfObject}`] = useLangField
      ? {
          [TranslationsService.getLanguage()]: TranslationsService.translate(
            'validation.required'
          )
        }
      : TranslationsService.translate('validation.required');
  }
  return errors;
};

export const validateMinTwoChars = (
  nameOfObject,
  value,
  errors,
  nameOfObjectField = TranslationsService.getLanguage(),
  useLangField = true
) => {
  if (value && value.length < 2) {
    errors[`${nameOfObject}`] = useLangField
      ? {
          [nameOfObjectField]: TranslationsService.translate(
            'validation.minTwoChars'
          )
        }
      : TranslationsService.translate('validation.minTwoChars');
  }
  return errors;
};

export const validateAtLeastRequired = (
  nameOfObject,
  value,
  minRequired,
  errors,
  useLangField = true
) => {
  if (value && value.length < minRequired) {
    errors[`${nameOfObject}`] = useLangField
      ? {
          [TranslationsService.getLanguage()]: TranslationsService.translate(
            'validation.required'
          )
        }
      : TranslationsService.translate('validation.required');
  }
  return errors;
};

export const validateURL = (
  nameOfObject,
  value,
  errors,
  returnAsArray = false
) => {
  if (value && !isURL(value)) {
    if (!returnAsArray) {
      errors[`${nameOfObject}`] = TranslationsService.translate(
        'validation.validateLink'
      );
    } else {
      errors[`${nameOfObject}`] = [
        TranslationsService.translate('validation.validateLink')
      ];
    }
  }
  return errors;
};

export const validateLinkReturnAsSkosType = (
  nameOfObject,
  value,
  errors,
  nameOfObjectField = TranslationsService.getLanguage(),
  useLangField = true
) => {
  if (value && !isURL(value)) {
    errors[`${nameOfObject}`] = useLangField
      ? [
          {
            [nameOfObjectField]: TranslationsService.translate(
              'validation.validateLink'
            )
          }
        ]
      : [TranslationsService.translate('validation.validateLink')];
  }
  return errors;
};

export const validateEmail = (nameOfObject, value, errors) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errors[`${nameOfObject}`] = TranslationsService.translate(
      'validation.validateEmail'
    );
  }
  return errors;
};

export const validatePhone = (nameOfObject, value, errors) => {
  if (value && !/^[+]?[(]?[0-9]{4,12}$/i.test(value)) {
    errors[`${nameOfObject}`] = TranslationsService.translate(
      'validation.validatePhone'
    );
  }
  return errors;
};

export const minLength = min => value =>
  value && value.length < min
    ? TranslationsService.translate('validation.required')
    : undefined;

/* eslint-enable no-param-reassign */
