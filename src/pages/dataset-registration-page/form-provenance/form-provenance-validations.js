import _get from 'lodash/get';

import { validateMinTwoChars } from '../../../validation/validation';

import TranslationsService from '../../../services/translations';

const validate = values => {
  const errors = {};
  let errorHasCurrentnessAnnotation = {};
  const hasCurrentnessAnnotation = _get(
    values,
    ['hasCurrentnessAnnotation', 'hasBody', TranslationsService.getLanguage()],
    null
  );
  errorHasCurrentnessAnnotation = validateMinTwoChars(
    'hasBody',
    hasCurrentnessAnnotation,
    errorHasCurrentnessAnnotation,
    TranslationsService.getLanguage()
  );

  if (JSON.stringify(errorHasCurrentnessAnnotation) !== '{}') {
    errors.hasCurrentnessAnnotation = errorHasCurrentnessAnnotation;
  }
  return errors;
};

export default validate;
