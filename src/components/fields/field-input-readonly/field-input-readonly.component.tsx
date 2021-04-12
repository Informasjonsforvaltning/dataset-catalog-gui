import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { WrappedFieldProps } from 'redux-form';
import cx from 'classnames';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
  language?: string;
  isOnlyOneSelectedLanguage?: boolean;
}

interface Props extends ExternalProps {}

const InputFieldReadonly: FC<Props> = ({
  input: { name, value },
  label,
  showLabel,
  language,
  isOnlyOneSelectedLanguage
}) => (
  <>
    {value.length > 0 && (
      <div className={cx('pl-2', { 'multilingual-field': !!language })}>
        <label className='fdk-form-label w-100' htmlFor={name}>
          {showLabel ? label : null}
          <div className='readonly-language-field'>
            {!!language && !isOnlyOneSelectedLanguage && (
              <div className='p-2'>
                <div className='indicator'>{language}</div>
              </div>
            )}
            <div className='read-only-text'>{value}</div>
          </div>
        </label>
      </div>
    )}
  </>
);

export default compose<FC<ExternalProps>>(memo)(InputFieldReadonly);
