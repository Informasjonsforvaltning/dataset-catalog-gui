import _get from 'lodash/get';

import TranslationsService from '../../services/translations';

const validate = values => {
  const errors = {};
  const spatial = _get(values, ['spatial', 'uri'], null);
  if (spatial && spatial.length < 2) {
    errors.spatial = {
      uri: TranslationsService.translate('validation.minTwoChars')
    };
  }
  return errors;
};

export default validate;
