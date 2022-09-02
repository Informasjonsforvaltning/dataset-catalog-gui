import React, { memo, FC, PropsWithChildren, useEffect, useState } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import Translation from '../translation';

import './form-template.scss';

import {
  ChevronUpIcon,
  ChevronDownIcon,
  TriangleExclamationIcon
} from '../../fdk-icons/icons';

interface ExternalProps {
  title: string;
  backgroundBlue?: boolean;
  values?: string | null;
  required?: boolean;
  recommended?: boolean;
  showInitially?: boolean;
  syncErrors?: any;
}

interface Props extends ExternalProps {}

const FormTemplate: FC<PropsWithChildren<Props>> = ({
  title,
  backgroundBlue,
  values,
  syncErrors,
  required,
  recommended,
  children,
  showInitially
}) => {
  const [collapse, toggleCollapse] = useState(showInitially);

  useEffect(() => {
    toggleCollapse(showInitially);
  }, [showInitially]);

  const collapseClass = cx('fdk-reg_collapse', {
    'fdk-reg_backgroundDefault': !backgroundBlue,
    'fdk-reg_backgroundBlue': backgroundBlue,
    'fdk-reg_collapse_open': collapse
  });

  const buttonClass = cx('fdk-collapseButton', 'fdk-btn-no-border', 'w-100', {
    'p-0': !backgroundBlue
  });

  const collapseContentClass = cx('mt-3', {
    'fdk-collapseContent': backgroundBlue
  });

  return (
    <div className={collapseClass}>
      <button
        type='button'
        className={buttonClass}
        onClick={() => toggleCollapse(!collapse)}
      >
        <div className='d-flex align-items-center'>
          {collapse ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <h2 className='mb-0 text-ellipsis'>{title}</h2>
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
          {syncErrors && (
            <div className='d-flex justify-content-end fdk-syncError-icon'>
              <TriangleExclamationIcon />
            </div>
          )}
        </div>
        {!collapse && values && (
          <div className='d-flex text-left fdk-text-size-small fdk-color-neutral-dark'>
            <i className='fa fa-2x fa-angle-down mr-2 visibilityHidden' />
            <span className='text-ellipsis'>{values}</span>
          </div>
        )}
      </button>
      <Collapse className={collapseContentClass} isOpen={collapse}>
        {children}
      </Collapse>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(FormTemplate);
