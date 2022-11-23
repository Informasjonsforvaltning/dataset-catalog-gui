import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { FC } from 'react';
import { localization } from '../../utils/language/localization';
import Icon from '../icon';
import Button from '../inputs/button';
import InputField from '../inputs/input-field';
import SC from './styled';

const Search: FC = () => {
  return (
    <SC.Search>
      <InputField ariaLabel={localization.searchForDataset} />
      <Button
        btnType='filled'
        name={localization.button.lastModifiedSearch}
        endIcon={<Icon name='chevronDownStroke' />}
        bg={theme.colour(Colour.BLUE, 'B30')}
        btnColor={theme.colour(Colour.BLUE, 'B60')}
      />
      <Button
        btnType='filled'
        name={localization.button.statusSearch}
        endIcon={<Icon name='chevronDownStroke' />}
        bg={theme.colour(Colour.BLUE, 'B30')}
        btnColor={theme.colour(Colour.BLUE, 'B60')}
      />
    </SC.Search>
  );
};

export default Search;
