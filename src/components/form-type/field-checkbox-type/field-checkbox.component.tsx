import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

const types = [
  {
    id: 1,

    label: 'Data'
  },
  {
    id: 2,
    label: 'Kodelister'
  },
  {
    id: 3,
    label: 'Tesauri'
  },
  {
    id: 4,
    label: 'Taksonomi'
  },
  {
    id: 5,
    label: 'Testdata'
  }
];

interface ExternalProps {}

interface Props extends ExternalProps, WrappedFieldProps {}

const CheckboxFieldType: FC<Props> = ({ input }) => {
  const handleChange = (event: any) => {
    const selectedItemLabel = event.target.value;
    // Skal fjerne fra array
    if (!event.target.checked) {
      input.onChange('');
    } else {
      // add object
      input.onChange(selectedItemLabel);
    }
  };

  return (
    <div>
      {types.map((type, index) => (
        <label
          key={index}
          className='form-check fdk-form-checkbox'
          htmlFor={type.label}
        >
          <input
            type='checkbox'
            name='types'
            style={{ height: '18px', width: '18px' }}
            id={type.label}
            value={type.label}
            checked={input?.value === type.label}
            onChange={handleChange}
          />
          <span className='form-check-label fdk-form-check-label mr-3' />
          <span>{type.label}</span>
        </label>
      ))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(CheckboxFieldType);
