import * as yup from 'yup';

import TranslationsService from '../../services/translations';

export default yup.object().shape({
  relations: yup.array().of(
    yup.object().shape({
      uri: yup
        .string()
        .url(TranslationsService.translate('validation.validateLink'))
    })
  )
});
