import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import CheckboxFieldTheme from './theme-checkbox/theme-checkbox.component';
import AlertMessage from '../alert-message/alert-message.component';
import { themesValues } from '../../pages/dataset-registration-page/dataset-registration-page.logic';

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
        <AlertMessage type='warning'>
          <i className='fa fa-info-circle mr-2' />
          <span>
            <Translation id='schema.theme.deprecatedTheme' />
          </span>
        </AlertMessage>
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
