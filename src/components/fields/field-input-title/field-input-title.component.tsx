import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

import Translation from '../../translation';

import './field-input-title.scss';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
  type?: string;
  hideInput?: boolean;
  onToggleTitle: () => void;
}

interface Props extends ExternalProps {}

const InputTitleField: FC<Props> = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  showLabel,
  hideInput,
  onToggleTitle
}) => (
  <div>
    <div className='d-flex align-items-center'>
      {hideInput && (
        <div className='w-100'>
          <h1>
            <label className='fdk-form-label w-100' htmlFor={input.name}>
              {showLabel ? label : null}
              <input
                id='titleInput'
                {...input}
                type={type}
                className='fdk-text-strong'
              />
            </label>
          </h1>
        </div>
      )}
      {!hideInput && (
        <button
          type='button'
          className='fdk-edit ml-2 mt-2 nowrap'
          onClick={e => {
            e.preventDefault();
            onToggleTitle();
          }}
        >
          <i className='fa fa-pencil mr-2' />
          <Translation id='app.editTitle' />
        </button>
      )}
    </div>
    {touched &&
      ((error && <div className='alert alert-danger mt-3'>{error}</div>) ||
        (warning && <div className='alert alert-warning mt-3'>{warning}</div>))}
  </div>
);

export default compose<FC<ExternalProps>>(memo)(InputTitleField);
