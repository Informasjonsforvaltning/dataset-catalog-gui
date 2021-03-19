import React, { FC } from 'react';
import Select, {
  components,
  createFilter,
  ActionMeta,
  OptionTypeBase
} from 'react-select';

import { getTranslateText } from '../../../services/translateText';
import localization from '../../../services/localization';

import SC from './styled';

import { RegistrationStatus } from '../../../types/enums';

interface Props {
  input: any;
  meta: any;
  items: any[];
  valueKey: string;
  labelKey: string;
  onInputChange?: (arg: string) => void;
}

const SelectField: FC<Props> = ({
  input,
  meta: { touched, error, warning } = null,
  items = [],
  labelKey = 'prefLabel',
  valueKey = 'uri',
  onInputChange
}) => {
  const defaultFilter = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFromStart: false,
    stringify: option => getTranslateText(option.data[labelKey])
  };

  const getLabel = (option: any) =>
    getTranslateText(option[labelKey] ?? option.title ?? option.prefLabel);

  const getValue = () => {
    if (typeof input.value === 'string' && items) {
      return items.find(item => item[valueKey] === input.value) ?? {};
    }
    return getLabel(input.value) ? input.value : null;
  };

  const saveOption = (option: any, change: ActionMeta<OptionTypeBase>) => {
    switch (change.action) {
      case 'select-option':
        input.onChange({ prefLabel: option[labelKey], ...option });
        break;
      case 'clear':
        input.onChange({
          uri: null,
          prefLabel: {
            no: null
          }
        });
        break;
      default:
        break;
    }
  };

  const Option = (props: any) => {
    const { data } = props;
    const label = getLabel(data);
    const publishingStatus = data.registrationStatus;
    const { internal } = data;
    return label ? (
      <components.Option {...props}>
        {label}
        {publishingStatus ? (
          <SC.DatasetOption>
            {`(${
              internal
                ? localization.schema.reference.helptext.internal
                : localization.schema.reference.helptext.external
            }/ ${
              publishingStatus === RegistrationStatus.PUBLISH
                ? localization.schema.reference.helptext.publish
                : localization.schema.reference.helptext.approve
            })`}
          </SC.DatasetOption>
        ) : null}
      </components.Option>
    ) : null;
  };

  return (
    <div className="pl-2 mt-3">
      <Select
        id="frequency-select"
        options={items}
        isClearable
        name="selected-state"
        isDisabled={false}
        components={{
          Option,
          SingleValue: props => getLabel(props.data)
        }}
        placeholder="Velg"
        filterOption={onInputChange ? null : createFilter(defaultFilter)}
        onInputChange={onInputChange}
        onChange={saveOption}
        value={getValue()}
        isOptionSelected={(option: any) => option === getValue()}
      />
      {touched &&
        ((error && <div className="alert alert-danger mt-3">{error}</div>) ||
          (warning && (
            <div className="alert alert-warning mt-3">{warning}</div>
          )))}
    </div>
  );
};

export default SelectField;
