import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

interface ExternalProps {
  themesItems: any[];
}

interface Props extends ExternalProps, WrappedFieldProps {}

const CheckboxFieldTheme: FC<Props> = ({ input, themesItems }) => {
  const themeCodes = input?.value?.map(({ uri }: any) => uri) ?? [];

  const handleChange = (event: any) => {
    const selectedItemURI = event.target.value;

    // Skal fjerne fra array
    if (!event.target.checked) {
      const newInput = input.value.filter(
        ({ uri }: any) => uri !== selectedItemURI
      );
      input.onChange(newInput);
    } else {
      // add object
      const updates = input?.value ?? [];
      updates.push({ uri: selectedItemURI });
      input.onChange(updates);
    }
  };

  return (
    <div>
      {themesItems.map((theme, index) => (
        <label
          key={index}
          className='form-check fdk-form-checkbox'
          htmlFor={theme.uri}
        >
          <input
            type='checkbox'
            name='themes'
            style={{ height: '18px', width: '18px' }}
            id={theme.uri}
            value={theme.uri}
            checked={themeCodes.includes(theme.uri)}
            onChange={handleChange}
          />
          <span className='form-check-label fdk-form-check-label mr-3' />
          <span>{theme.label?.nb ?? theme.label?.en}</span>
        </label>
      ))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(CheckboxFieldTheme);
