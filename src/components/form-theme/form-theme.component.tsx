import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Helptext from '../helptext/helptext.component';
import CheckboxFieldTheme from './theme-checkbox/theme-checkbox.component';
import { themesValues } from '../dataset-registration-form/dataset-registration-page.logic';

interface ExternalProps {
  initialValues: any;
  syncErrors: any;
  isReadOnly: boolean;
  themes: any;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormThemes: FC<Props> = ({
  syncErrors,
  initialValues: { theme, themesItems },
  isReadOnly,
  themes,
  translationsService
}) =>
  theme && themesItems ? (
    <form>
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate('schema.theme.helptext.theme')}
          term='Dataset_theme'
        />
        {isReadOnly && (
          <div className='pl-3'>{themesValues(themes.values)}</div>
        )}
        {!isReadOnly && (
          <Field
            name='theme'
            component={CheckboxFieldTheme}
            themesItems={themesItems}
          />
        )}
        {syncErrors?.errorTheme && (
          <div className='alert alert-danger mt-3'>{syncErrors.errorTheme}</div>
        )}
      </div>
    </form>
  ) : null;

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormThemes);
