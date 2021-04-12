import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

import './field-radio.scss';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  radioId?: string;
  disabled?: boolean;
}

interface Props extends ExternalProps {}

const RadioField: FC<Props> = ({ input, label, radioId, disabled }) => (
  <label
    className='form-check fdk-form-check mb-0'
    style={{ opacity: disabled ? '0.3' : '1' }}
    htmlFor={radioId}
  >
    <input
      {...input}
      type='radio'
      className='form-check-input'
      id={radioId}
      disabled={disabled}
    />
    <span className='form-check-label fdk-form-check-label' />
    {label}
  </label>
);

export default compose<FC<ExternalProps>>(memo)(RadioField);
