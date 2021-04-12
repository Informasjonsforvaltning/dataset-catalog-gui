import React, { memo, FC } from 'react';
import { compose } from 'redux';
import moment from 'moment';

import 'moment/locale/nb';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Translation from '../../translation';

const formatLastSaved = (lastSaved: string) =>
  moment(lastSaved).calendar(undefined, {
    lastDay: '[i går kl.] LT',
    sameDay() {
      return `[for ${this.fromNow}]`;
    },
    lastWeek: '[på] dddd [kl.] LT',
    sameElse: 'DD.MM.YYYY'
  });

interface ExternalProps {
  error: any;
  lastSaved?: string;
}

interface Props extends ExternalProps, TranslationsProps {}

const ErrorDialog: FC<Props> = ({ error, lastSaved, translationsService }) => (
  <div className='form-status-bar-overlay d-flex align-items-center justify-content-between alert-warning'>
    <Translation
      id={
        error.code === 'network_error'
          ? 'formStatus.error.network'
          : 'formStatus.error.saving'
      }
    />
    {lastSaved &&
      ` ${translationsService.translate('app.lastSaved')} ${formatLastSaved(
        lastSaved
      )}.`}
  </div>
);

export default compose<FC<ExternalProps>>(memo, withTranslations)(ErrorDialog);
