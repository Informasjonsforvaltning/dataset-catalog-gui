import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

import Translation from '../../../../components/translation';

interface ExternalProps {
  label: string;
  showLabel: boolean;
  publisher: any;
}

interface Props extends ExternalProps, WrappedFieldProps {}

const PublisherField: FC<Props> = ({ input, label, showLabel, publisher }) => (
  <div className='d-flex align-items-center'>
    <label className='fdk-form-label w-100' htmlFor={input.name}>
      {showLabel ? label : null}
      <button
        name='publisher'
        type='button'
        className='ml-5 btn btn-primary fdk-button'
        onClick={e => {
          e.preventDefault();

          if (publisher) {
            input.onChange(publisher);
          }
        }}
      >
        <Translation id='choose' />
      </button>
    </label>
  </div>
);

export default compose<FC<ExternalProps>>(memo)(PublisherField);
