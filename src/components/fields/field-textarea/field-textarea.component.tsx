import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import cx from 'classnames';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
  language?: string;
  isOnlyOneSelectedLanguage?: boolean;
}

interface Props extends ExternalProps {}

const TextAreaField: FC<Props> = ({
  input,
  label,
  meta: { touched, error, warning },
  showLabel,
  language,
  isOnlyOneSelectedLanguage
}) => (
  <div className={cx('pl-2', { 'multilingual-field': !!language })}>
    <label className='fdk-form-label w-100' htmlFor={input.name}>
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator language-indicator-text-area'>
          {language}
        </span>
      )}
      <textarea rows={5} {...input} className='form-control' />
    </label>
    {touched &&
      ((error && <div className='alert alert-danger mt-3'>{error}</div>) ||
        (warning && <div className='alert alert-warning mt-3'>{warning}</div>))}
  </div>
);

export default compose<FC<ExternalProps>>(memo)(TextAreaField);
