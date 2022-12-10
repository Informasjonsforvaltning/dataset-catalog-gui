import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { FC } from 'react';
import { ACTION_TYPE } from '../../context/actions';
import { useTableDispatch } from '../../context/table-context';
import { localization } from '../../utils/language/localization';
import Icon from '../icon';
import Button from '../inputs/button';
import InputField from '../inputs/input-field';
import SC from './styled';

const Search: FC = () => {
  const tableDispatch = useTableDispatch();
  const onInputSubmit = (searchTerm: string) =>
    tableDispatch({ type: ACTION_TYPE.FILTER_DATASETS, payload: { type: 'search', value: searchTerm } });

  return (
    <SC.Search>
      <InputField ariaLabel={localization.searchForDataset} onInputSubmit={onInputSubmit} />
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
