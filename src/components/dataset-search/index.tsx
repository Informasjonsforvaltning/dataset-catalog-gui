import React, { FC } from 'react';
import { localization } from '../../utils/language/localization';
import Icon from '../icon';
import Button from '../inputs/button';
import SC from './styled';

const Search: FC = () => {
  return (
    <SC.Search>
      <SC.StyledInputBox label={localization.searchForDataset} />
      <Button type='filled' name={localization.button.lastModifiedSearch} endIcon={<Icon name='chevronDownStroke' />} />
      <Button type='filled' name={localization.button.statusSearch} endIcon={<Icon name='chevronDownStroke' />} />
    </SC.Search>
  );
};

export default Search;
