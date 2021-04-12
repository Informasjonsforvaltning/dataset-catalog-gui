import _get from 'lodash/get';

import TranslationsService from '../../services/translations';

import {
  validateRequired,
  validateMinTwoChars
} from '../../validation/validation';

const validate = values => {
  let errors = {};
  const title = _get(
    values,
    ['title', TranslationsService.getLanguage()],
    null
  );
  const description = _get(
    values,
    ['description', TranslationsService.getLanguage()],
    null
  );

  errors = validateRequired('title', title, errors);
  errors = validateMinTwoChars('title', title, errors);

  errors = validateRequired('description', description, errors);
  errors = validateMinTwoChars('description', description, errors);

  return errors;
};

export default validate;
