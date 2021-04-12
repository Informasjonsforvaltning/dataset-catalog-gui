import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, WrappedFieldArrayProps } from 'redux-form';

import InputField from '../../../../components/fields/field-input/field-input.component';
import MultilingualField from '../../../../components/multilingual-field/multilingual-field.component';
import LinkReadonlyField from '../../../../components/fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../../../../components/fields/field-input-readonly/field-input-readonly.component';

interface ExternalProps {
  titleLabel: string;
  linkLabel: string;
  languages: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, WrappedFieldArrayProps {}

const Standard: FC<Props> = ({
  fields,
  titleLabel,
  linkLabel,
  languages,
  isReadOnly
}) => (
  <div>
    {fields?.map((item, index) => (
      <div className='d-flex flex-column mb-5' key={index}>
        <MultilingualField
          name={`${item}.prefLabel`}
          component={isReadOnly ? InputFieldReadonly : InputField}
          label={titleLabel}
          showLabel
          languages={languages}
        />
        <div className='mt-2'>
          <Field
            name={`${item}.uri`}
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={linkLabel}
            showLabel
          />
        </div>
      </div>
    ))}
  </div>
);

export default compose<FC<ExternalProps>>(memo)(Standard);
