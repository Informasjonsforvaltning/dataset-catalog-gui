/* eslint-disable react/no-danger */
import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Collapse } from 'reactstrap';

import { convertToSanitizedHtml } from '../../lib/markdown-converter';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';

import './helptext.scss';

import {
  ChevronDoubleDownInlineIcon,
  ChevronDoubleUpInlineIcon
} from '../../fdk-icons/icons';

interface ExternalProps {
  title: string;
  term?: string;
  required?: boolean;
  recommended?: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const HelpText: FC<Props> = ({
  title,
  term,
  required,
  recommended,
  translationsService
}) => {
  const [showAll, toggleShowAll] = useState(false);

  const abstract = term
    ? translationsService.translate(`helptexts.${term}.abstract`)
    : null;
  const description = term
    ? translationsService.translate(`helptexts.${term}.description`)
    : null;

  return (
    <div className='fdk-reg-helptext mb-3 p-3'>
      <div className='d-flex align-items-center'>
        <h3>{title}</h3>
        {required && (
          <span className='fdk-badge badge-pill fdk-obligatorisk fdk-bg-color-button-primary-2 fdk-color-button-text-primary ml-2 fdk-text-size-small'>
            <Translation id='helptext.required' />
          </span>
        )}
        {recommended && (
          <span className='fdk-badge badge-pill fdk-anbefalt fdk-bg-color-link-lighter fdk-color-link-darker ml-2 fdk-text-size-small'>
            <Translation id='helptext.recommended' />
          </span>
        )}
      </div>
      <div className='d-md-flex'>
        {abstract && (
          <div
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(abstract)
            }}
          />
        )}
        {description && (
          <button
            type='button'
            className='fdk-btn-no-border text-left p-0 ml-1 fdk-reg-helptext-more align-self-start'
            onClick={() => toggleShowAll(!showAll)}
          >
            {showAll ? (
              <ChevronDoubleUpInlineIcon />
            ) : (
              <ChevronDoubleDownInlineIcon />
            )}
            <Translation id={showAll ? 'helptext.less' : 'helptext.more'} />
          </button>
        )}
      </div>
      {description && (
        <Collapse className='mt-3' isOpen={showAll}>
          <div
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(description)
            }}
          />
        </Collapse>
      )}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(HelpText);
