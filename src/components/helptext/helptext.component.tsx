/* eslint-disable react/no-danger */
import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import { convertToSanitizedHtml } from '../../lib/markdown-converter';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';

import './helptext.scss';

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

  const collapseClass = cx('fa', 'fdk-fa-left', {
    'fa-angle-double-down': !showAll,
    'fa-angle-double-up': showAll
  });

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
          <span className='fdk-badge badge fdk-obligatorisk fdk-bg-color-warning-lightest ml-2'>
            <Translation id='helptext.required' />
          </span>
        )}
        {recommended && (
          <span className='fdk-badge badge-pill fdk-bg-color-link-lighter fdk-color-link-darker ml-2 fdk-text-size-small'>
            <Translation id='helptext.recommended' />
          </span>
        )}
      </div>
      <div className='d-md-flex'>
        {abstract && (
          <pre
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
            <i className={collapseClass} />
            <Translation id={showAll ? 'helptext.less' : 'helptext.more'} />
          </button>
        )}
      </div>
      {description && (
        <Collapse className='mt-3' isOpen={showAll}>
          <pre
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
