import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { ChangeEvent, FC, useState } from 'react';
import svgIconAsSourceUrl from '../../../utils/helpers/svg-icon';

import { DropDown as StyledDropDown } from './styled';

type DropDownType = 'add' ;

interface DropDownOption {
  name: string;
  value: string;
}

interface DropDownProps {
  name?: string;
  label?: string;
  dropdownColor?: (prop: any) => string;
  bg?: (prop: any) => string;
  options?: DropDownOption[];
  onDropdownSelect?: (inputValue: string) => void | any;
  dropDownType?: DropDownType;
}

const DropDown: FC<DropDownProps> = ({
  name = 'Button',
  dropdownColor = theme.colour(Colour.NEUTRAL, 'N0'),
  bg = theme.colour(Colour.BLUE, 'B60'),
  onDropdownSelect,
  dropDownType = '',
  options = [],
}) => {
  const [selectValue, setSelectValue] = useState('');

  const opsToJsx = () => {
    let undefCounter = 0;
    return options.map(({ name, value }) => (
      <option key={value ?? (undefCounter++).toString()} value={value}>
        {name}
      </option>
    ));
  };

  const onSelect = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(changeEvent.target.value);
    onDropdownSelect && onDropdownSelect(changeEvent.target.value);
  };

  return (
    <label>
      <StyledDropDown
        $dropdownColor={dropdownColor}
        $bg={bg}
        $icon={svgIconAsSourceUrl('chevronDownStroke', dropDownType === 'add' ? 'white' : '#335380')}
        $hoverIcon={svgIconAsSourceUrl('chevronDownStroke', 'white')}
        value={selectValue}
        onChange={onSelect}
      >
        <option value='' hidden>
          {name}
        </option>
        {opsToJsx()}
      </StyledDropDown>
    </label>
  );
};

export default DropDown;
export { DropDownType, DropDownOption, DropDownProps };
