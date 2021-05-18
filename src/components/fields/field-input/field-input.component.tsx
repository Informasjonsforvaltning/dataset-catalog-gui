import React, { memo, FC } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import type { WrappedFieldProps } from 'redux-form';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
  type?: string;
  language?: string;
  isOnlyOneSelectedLanguage?: boolean;
}

interface Props extends ExternalProps {}

const InputField: FC<Props> = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  showLabel,
  language,
  isOnlyOneSelectedLanguage
}) => (
  <div className={cx('pl-2', { 'multilingual-field': !!language })}>
    <div className='d-flex align-items-center'>
      <label className='fdk-form-label w-100' htmlFor={input.name}>
        {showLabel && label && <span className='mb-2 d-block'>{label}</span>}
        {!!language && !isOnlyOneSelectedLanguage && (
          <span className='language-indicator'>{language}</span>
        )}
        <input {...input} type={type} className='form-control' />
      </label>
    </div>
    {touched &&
      ((error && <div className='alert alert-danger mt-3'>{error}</div>) ||
        (warning && <div className='alert alert-warning mt-3'>{warning}</div>))}
  </div>
);

export default compose<FC<ExternalProps>>(memo)(InputField);
