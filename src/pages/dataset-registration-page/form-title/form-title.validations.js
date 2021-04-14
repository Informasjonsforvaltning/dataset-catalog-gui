import * as Yup from 'yup';

import TranslationsService from '../../../services/translations';

export const schema = Yup.object().shape({
  title: Yup.object().shape({
    nb: Yup.string()
      .nullable()
      .test(function test() {
        const { nb, nn, en } = this.parent;
        if (!nb && !nn && !en) {
          return this.createError({
            message: TranslationsService.translate('validation.required'),
            path: this.path
          });
        }
        return true;
      }),
    nn: Yup.string()
      .nullable()
      .test(function test() {
        const { nb, nn, en } = this.parent;
        if (!nb && !nn && !en) {
          return this.createError({
            message: TranslationsService.translate('validation.required'),
            path: this.path
          });
        }
        return true;
      }),
    en: Yup.string()
      .nullable()
      .test(function test() {
        const { nb, nn, en } = this.parent;
        if (!nb && !nn && !en) {
          return this.createError({
            message: TranslationsService.translate('validation.required'),
            path: this.path
          });
        }
        return true;
      })
  }),
  description: Yup.object().shape({
    nb: Yup.string()
      .nullable()
      .test(function test() {
        const { nb, nn, en } = this.parent;
        if (!nb && !nn && !en) {
          return this.createError({
            message: TranslationsService.translate('validation.required'),
            path: this.path
          });
        }
        return true;
      }),
    nn: Yup.string()
      .nullable()
      .test(function test() {
        const { nb, nn, en } = this.parent;
        if (!nb && !nn && !en) {
          return this.createError({
            message: TranslationsService.translate('validation.required'),
            path: this.path
          });
        }
        return true;
      }),
    en: Yup.string()
      .nullable()
      .test(function test() {
        const { nb, nn, en } = this.parent;
        if (!nb && !nn && !en) {
          return this.createError({
            message: TranslationsService.translate('validation.required'),
            path: this.path
          });
        }
        return true;
      })
  }),
  landingPage: Yup.array().of(
    Yup.string().url(TranslationsService.translate('validation.validateLink'))
  )
});
