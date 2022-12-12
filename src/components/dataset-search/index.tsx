import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { FC } from 'react';
import { ACTION_TYPE } from '../../context/actions';
import { useTableDispatch } from '../../context/table-context';
import { localization } from '../../utils/language/localization';
import DropDown from '../inputs/dropdown';
import InputField from '../inputs/input-field';
import SC from './styled';

const Search: FC = () => {
  const options: [string, string][] = Object.entries(localization.tag);

  const tableDispatch = useTableDispatch();

  const onInputSubmit = (searchTerm: string) =>
    tableDispatch({ type: ACTION_TYPE.FILTER_DATASETS, payload: { type: 'search', value: searchTerm } });

  const onDropdownSelect = (status: string) =>
    tableDispatch({
      type: ACTION_TYPE.FILTER_DATASETS,
      payload: {
        type: 'status',
        value: getEnglishStatus(status),
      },
    });

  const getBokmaalStatus = (): (string | undefined)[] =>
    options
      .map(status => {
        return status ? localization.tag[status[0].toLowerCase()] : ' ';
      })
      .filter(status => status);

  const getEnglishStatus = (status: string): string => {
    const engStatus = options.find(option => (option[1].toLowerCase() === status.toLowerCase() ? option[0] : ''));
    return engStatus ? engStatus[0] : '';
  };

  return (
    <SC.Search>
      <InputField ariaLabel={localization.searchForDataset} onInputSubmit={onInputSubmit} />
      <DropDown
        name={localization.dropdown.statusSearch}
        bg={theme.colour(Colour.BLUE, 'B30')}
        dropdownColor={theme.colour(Colour.BLUE, 'B60')}
        options={getBokmaalStatus()}
        onDropdownSelect={onDropdownSelect}
      />
    </SC.Search>
  );
};

export default Search;
