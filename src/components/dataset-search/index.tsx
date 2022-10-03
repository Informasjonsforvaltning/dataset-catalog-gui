import React, { FC } from 'react';
import { localization } from '../../utils/language/localization';
import Icon from '../icon';
import SC from './styled';

const Search: FC = () => {
  return (
    <SC.Search>
      <SC.StyledInputBox label={localization.searchForDataset} />
      <SC.SearchButton label={localization.btnFilterOnPerson} endIcon={<Icon name='chevronDownStroke' />} />
      <SC.SearchButton label={localization.btnFilterOnStatus} endIcon={<Icon name='chevronDownStroke' />} />
    </SC.Search>
  );
};

export default Search;
