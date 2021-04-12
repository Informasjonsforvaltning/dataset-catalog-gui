import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
}

interface Props extends ExternalProps {}

const LinkReadonlyField: FC<Props> = ({
  input: { name, value },
  showLabel,
  label
}) => (
  <div className='pl-2 multilingual-field'>
    <label className='fdk-form-label w-100' htmlFor={name}>
      {showLabel ? label : null}
      <div>
        <a className='pl-3' href={value}>
          {value}
        </a>
      </div>
    </label>
  </div>
);

export default compose<FC<ExternalProps>>(memo)(LinkReadonlyField);
