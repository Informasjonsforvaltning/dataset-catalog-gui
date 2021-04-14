import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import Autocomplete from 'react-autocomplete';

interface ExternalProps {
  suggestions: any[];
  onChosenPublisher: (publisher: any) => void;
}

interface Props extends ExternalProps {}

const SearchPublisher: FC<Props> = ({ suggestions, onChosenPublisher }) => {
  const [searchText, setSearchText] = useState('');

  const selectSuggestion = (item: any) => {
    setSearchText(item.name);
    onChosenPublisher({
      uri: item.norwegianRegistry,
      name: item.name
    });
  };

  const renderInput = (props: any) => (
    <div className='input-group'>
      <input type='text' className='form-control' {...props} />
      <span className='input-group-btn input-group-append' />
    </div>
  );

  const renderItem = (item: any, isHighlighted: boolean) => (
    <div
      key={item.norwegianRegistry}
      className={cx('px-2', {
        'fdk-bg-color-neutral-lightest': isHighlighted
      })}
    >
      <span>{item?.organizationId ?? ''}</span> -{' '}
      <span>{item?.name ?? ''}</span>
    </div>
  );

  const renderMenu = (items: any, value: any, style: any) =>
    value.length < 1 ? (
      <div className='fdk-autocomplete-menu' style={{ ...style }}>
        {items.slice(0, 50)}
      </div>
    ) : null;

  const shouldItemRender = (item: any, value: any) =>
    (item?.organizationId ?? '').indexOf(value) > -1;

  const getItemValue = (item: any) => item?.norwegianRegistry ?? '';

  return (
    <div className='position-relative w-75'>
      <Autocomplete
        wrapperProps={{ style: { width: '100%' } }}
        items={suggestions}
        value={searchText}
        renderInput={renderInput}
        shouldItemRender={shouldItemRender}
        getItemValue={getItemValue}
        renderItem={renderItem}
        renderMenu={renderMenu}
        menuStyle={{ zIndex: 1000 }}
        onChange={({ target }) => setSearchText(target.value)}
        onSelect={(_, item) => selectSuggestion(item)}
      />

      <i
        className='fa fa-search'
        style={{
          position: 'absolute',
          right: '2%',
          top: '12px',
          zIndex: 1050
        }}
      />
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(SearchPublisher);
