import React, { memo, FC } from 'react';
import { compose } from 'redux';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import type { Tokens, Language } from '../../services/translations';

interface ExternalProps {
  id?: string;
  object?: Record<Language, string>;
  tokens?: Tokens;
}

interface Props extends ExternalProps, TranslationsProps {}

const Translation: FC<Props> = ({
  translationsService,
  id,
  object,
  tokens
}) => <>{translationsService.translate(id ?? object ?? '', tokens)}</>;

export default compose<FC<ExternalProps>>(memo, withTranslations)(Translation);
