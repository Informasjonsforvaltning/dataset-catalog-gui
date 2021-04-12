import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import TagsInput from 'react-tagsinput';

import './field-input-tags.scss';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
}

interface Props extends ExternalProps {}

const InputTagsField: FC<Props> = props => {
  const {
    input,
    label,
    meta: { touched, error, warning },
    showLabel
  } = props;
  return (
    <div className='pl-2'>
      <label className='fdk-form-label w-100' htmlFor={input.name}>
        {showLabel ? label : null}
        <TagsInput
          {...input}
          className='fdk-reg-input-tags'
          inputProps={{ placeholder: '' }}
          onChange={input.onChange}
          addOnBlur
        />
        {touched && !error && (
          <i className='fa fa-check-circle fa-lg ml-2 fdk-reg-save-success' />
        )}
        {!touched && <i className='fa fa-check-circle fa-lg ml-2 invisible' />}
      </label>
      {touched &&
        ((error && <div className='alert alert-danger mt-3'>{error}</div>) ||
          (warning && (
            <div className='alert alert-warning mt-3'>{warning}</div>
          )))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(InputTagsField);
