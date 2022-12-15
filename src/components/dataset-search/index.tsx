import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { FC } from 'react';
import { ACTION_TYPE } from '../../context/actions';
import { useTableDispatch } from '../../context/table-context';
import { localization } from '../../utils/language/localization';
import DropDown, { DropDownOption } from '../inputs/dropdown';
import InputField from '../inputs/input-field';
import SC from './styled';

const Search: FC = () => {
  const options: [string, string][] = Object.entries(localization.tag);

  const tableDispatch = useTableDispatch();

  const onInputSubmit = (searchTerm: string) =>
    tableDispatch({ type: ACTION_TYPE.FILTER_DATASETS, payload: { type: 'search', value: searchTerm } });

  const onDropdownSelect = (statusValue: string) => 
    tableDispatch({
      type: ACTION_TYPE.FILTER_DATASETS,
      payload: {
        type: 'status',
        value: statusValue
      },
    });

  const getStatusOptions = (): DropDownOption[] =>
    options
      .filter(status => status) 
      .map(status => {
        return { value: status[0] == 'all' ? '' : status[0], name: localization.tag[status[0]] };
      });
      
  return (
    <SC.Search>
      <InputField
        ariaLabel={localization.searchForDataset}
        onInputSubmit={onInputSubmit}
        placeholder={localization.searchForDataset}
      />
      <DropDown
        name={localization.dropdown.statusSearch}
        bg={theme.colour(Colour.BLUE, 'B30')}
        dropdownColor={theme.colour(Colour.BLUE, 'B60')}
        options={getStatusOptions()}
        onDropdownSelect={onDropdownSelect}
      />
    </SC.Search>
  );
};

export default Search;
