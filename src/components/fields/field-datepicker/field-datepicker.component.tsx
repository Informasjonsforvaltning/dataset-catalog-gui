import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import no from 'date-fns/locale/nb';

import './field-datepicker.scss';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
}

interface Props extends ExternalProps {}

registerLocale('no', no);

const DatepickerField: FC<Props> = ({
  input: { name, value, onChange },
  label,
  showLabel
}) => {
  const handleChange = (date: any) =>
    onChange(moment(date).format('YYYY-MM-DD'));

  return (
    <div className='pl-2'>
      <label id={name} className='fdk-form-label' htmlFor={name}>
        {showLabel ? label : null}
        {value && value !== 'Invalid date' && (
          <DatePicker
            id={name}
            className='fdk-reg-datepicker'
            dateFormat='dd.MM.yyyy'
            locale='no'
            showYearDropdown
            yearDropdownItemNumber={5}
            selected={value ? moment(value).toDate() : null}
            onChange={handleChange}
          />
        )}
        {(!value || value === 'Invalid date') && (
          <DatePicker
            id={name}
            className='fdk-reg-datepicker'
            dateFormat='dd.MM.yyyy'
            locale='no'
            showYearDropdown
            yearDropdownItemNumber={5}
            onChange={handleChange}
          />
        )}
      </label>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(DatepickerField);
