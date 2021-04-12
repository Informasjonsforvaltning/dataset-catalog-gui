import React, { memo, FC, ChangeEventHandler } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

import './field-checkbox.scss';

interface ExternalProps extends WrappedFieldProps {}

interface Props extends ExternalProps {}

const CheckboxField: FC<Props> = ({ input: { value, onChange } }) => {
  const langCodes = Array.isArray(value) ? value.map(({ code }) => code) : [];

  const handleChangeLang: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.checked) {
      onChange(value.filter(({ code }: any) => code !== event.target.value));
    } else {
      const updates = value.map(({ uri, code }: any) => ({ uri, code }));

      if (event.target.value === 'NOR') {
        updates.push({
          uri: 'http://publications.europa.eu/resource/authority/language/NOR',
          code: 'NOR',
          prefLabel: {
            nb: 'Norsk'
          }
        });
      } else if (event.target.value === 'ENG') {
        updates.push({
          uri: 'http://publications.europa.eu/resource/authority/language/ENG',
          code: 'ENG',
          prefLabel: {
            nb: 'Engelsk'
          }
        });
      } else if (event.target.value === 'SMI') {
        updates.push({
          uri: 'http://publications.europa.eu/resource/authority/language/SMI',
          code: 'SMI',
          prefLabel: {
            nb: 'Samisk'
          }
        });
      }

      onChange(updates);
    }
  };

  return (
    <div>
      <label className='form-check fdk-form-checkbox' htmlFor='ENG'>
        <input
          type='checkbox'
          name='language'
          id='ENG'
          value='ENG'
          checked={langCodes.includes('ENG')}
          onChange={handleChangeLang}
        />
        <span className='form-check-label fdk-form-check-label' />
        <span>Engelsk</span>
      </label>
      <label className='form-check fdk-form-checkbox' htmlFor='NOR'>
        <input
          type='checkbox'
          name='language'
          id='NOR'
          value='NOR'
          checked={langCodes.includes('NOR')}
          onChange={handleChangeLang}
        />
        <span className='form-check-label fdk-form-check-label' />
        <span>Norsk</span>
      </label>
      <label className='form-check fdk-form-checkbox' htmlFor='SMI'>
        <input
          type='checkbox'
          name='language'
          id='SMI'
          value='SMI'
          checked={langCodes.includes('SMI')}
          onChange={handleChangeLang}
        />
        <span className='form-check-label fdk-form-check-label' />
        <span>Samisk</span>
      </label>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(CheckboxField);
