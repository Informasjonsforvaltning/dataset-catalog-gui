import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { ChangeEvent, FC, useState } from 'react';

import { DropDown as StyledDropDown } from './styled';

type DropDownType = 'default' | 'filled' | 'link' | 'transparent' | 'dropdown';

interface DropDownProps {
  name?: string;
  dropdownColor?: (prop: any) => string;
  bg?: (prop: any) => string;
  options?: (string | undefined)[];
  onDropdownSelect?: (inputValue: string) => void | any;
}

const DropDown: FC<DropDownProps> = ({
  name = 'Button',
  dropdownColor = theme.colour(Colour.NEUTRAL, 'N0'),
  bg = theme.colour(Colour.BLUE, 'B60'),
  onDropdownSelect,
  options = [],
}) => {
  const [selectValue, setSelectValue] = useState('');

  const opsToJsx = () => {
    let undefCounter = 0;
    return options.map(name => (
      <option key={name ?? (undefCounter++).toString()} value={name?.toLocaleLowerCase()}>
        {name}
      </option>
    ));
  };

  const onSelect = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(changeEvent.target.value);
    onDropdownSelect && onDropdownSelect(changeEvent.target.value);
  };

  return (
    <StyledDropDown dropdownColor={dropdownColor} bg={bg} value={selectValue} onChange={onSelect}>
      <option value='' hidden>
        {name}
      </option>
      {opsToJsx()}
    </StyledDropDown>
  );
};

export default DropDown;
export { DropDownType, DropDownProps };
