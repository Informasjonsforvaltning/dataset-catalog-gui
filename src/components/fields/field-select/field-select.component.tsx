import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import Select from 'react-select';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

interface ExternalProps extends WrappedFieldProps {
  items?: any[];
  valueKey?: string;
  labelKey?: string;
  saveObject?: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const SelectField: FC<Props> = ({
  input: { value, onChange },
  meta: { touched, error, warning },
  items = [],
  valueKey = 'uri',
  saveObject,
  translationsService
}) => {
  const referencedInputObject =
    typeof value === 'string' && items
      ? items.find(item => item[valueKey] === value)
      : null;

  const handleChange = (selectedValue: string) => {
    let valueToBeSaved;

    // if delete value
    if (!selectedValue) {
      if (saveObject) {
        valueToBeSaved = {
          uri: null,
          prefLabel: {
            no: null
          }
        };
      } else {
        valueToBeSaved = '';
      }
    } else if (saveObject) {
      valueToBeSaved = items.find(item => item[valueKey] === selectedValue);
    } else {
      valueToBeSaved = selectedValue;
    }
    onChange(valueToBeSaved);
  };

  return (
    <div className='pl-2 mt-3'>
      <Select
        id='frequency-select'
        options={items.map(({ uri, prefLabel }) => ({
          value: uri,
          label: translationsService.translate(prefLabel)
        }))}
        simpleValue
        clearable
        name='selected-state'
        disabled={false}
        value={
          referencedInputObject
            ? referencedInputObject[valueKey]
            : value[valueKey]
        }
        onChange={handleChange}
        rtl={false}
        searchable
        placeholder='Velg'
      />
      {touched &&
        ((error && <div className='alert alert-danger mt-3'>{error}</div>) ||
          (warning && (
            <div className='alert alert-warning mt-3'>{warning}</div>
          )))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(SelectField);
