import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import Autosuggest from 'react-autosuggest';
import type { WrappedFieldProps } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import withKartverket, {
  Props as KartverketProps
} from '../../with-kartverket';

import Translation from '../../translation';
import TagsInputFieldArrayReadOnly from '../../fields/field-input-tags-objects-readonly/field-input-tags-objects-readonly.component';

import './styles.scss';

import type { AdministrativeUnit } from '../../../types';
import { AdministrativeUnitType } from '../../../types/enums';

interface ExternalProps extends WrappedFieldProps {
  isReadOnly?: boolean;
  onUpdateAdministrativeUnits: (
    administrativeUnits: AdministrativeUnit[]
  ) => void;
}

interface Props extends ExternalProps, TranslationsProps, KartverketProps {}

const SpatialTagsInputField: FC<Props> = ({
  input,
  meta,
  isReadOnly,
  administrativeUnitSuggestions,
  kartverketActions: {
    searchAdministrativeUnitsRequested: searchAdministrativeUnits,
    clearAdministrativeUnitsSearchSuggestions: clearSuggestions
  },
  onUpdateAdministrativeUnits,
  translationsService
}) => {
  const [value, setValue] = useState('');

  const removePlace = (index: number) => () => {
    input.value.splice(index, 1);
    onUpdateAdministrativeUnits(input.value);
  };

  const onChange = (_: any, { newValue, method }: any) => {
    if (method === 'type') {
      setValue(newValue ?? '');
    }
  };

  const fetchSuggestions = ({ value: name }: any) =>
    searchAdministrativeUnits(name ?? '', 5);

  const onSuggestionSelected = (_: any, { suggestion }: any) => {
    if (!input.value?.find(({ uri }: any) => uri === suggestion.uri)) {
      input.value.push({
        uri: suggestion.uri,
        prefLabel: { nb: suggestion.name }
      });

      onUpdateAdministrativeUnits(
        input.value.filter((v: any) => Object.entries(v).length > 0)
      );

      setValue('');
    }
  };

  const getSuggestionValue = ({ title }: any) =>
    translationsService.translate(title);

  const renderSuggestion = ({ name, type }: AdministrativeUnit) => (
    <div className='d-flex mb-3 suggestion'>
      <span>{name}</span>
      {type === AdministrativeUnitType.MUNICIPALITY && (
        <span className='ml-5'>
          <Translation id='administrativeUnit.municipality' />
        </span>
      )}
      {type === AdministrativeUnitType.COUNTY && (
        <span className='ml-5'>
          <Translation id='administrativeUnit.county' />
        </span>
      )}
      {type === AdministrativeUnitType.NATION && (
        <span className='ml-5'>
          <Translation id='administrativeUnit.nation' />
        </span>
      )}
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }: any) => (
    <div {...containerProps}>
      {children && children.props.items.length > 0 && (
        <div className='d-flex mb-3 react_autosuggest__suggestions-heading'>
          <span>
            <strong>
              <Translation id='administrativeUnit.name' />
            </strong>
          </span>
          <span className='ml-5'>
            <strong>
              <Translation id='administrativeUnit.type' />
            </strong>
          </span>
        </div>
      )}
      {children}
    </div>
  );

  const renderInputComponent = (inputProps: any) => (
    <input {...inputProps} className='form-control react-autosuggest__input' />
  );

  return isReadOnly ? (
    <TagsInputFieldArrayReadOnly input={input} meta={meta} />
  ) : (
    <div className='fdk-spatial'>
      <Autosuggest
        highlightFirstSuggestion
        suggestions={administrativeUnitSuggestions}
        onSuggestionsFetchRequested={fetchSuggestions}
        onSuggestionsClearRequested={clearSuggestions}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderInputComponent={renderInputComponent}
        inputProps={{
          value,
          type: 'text',
          onChange
        }}
      />
      {input.value?.map(({ uri, prefLabel }: any, index: number) => (
        <div
          key={`external-spatial-${uri}-${index}`}
          className='fdk-spatial-pill'
        >
          <span className='fdk-spatial-pill-label'>
            <Translation object={prefLabel} />
          </span>
          <i
            className='fa fa-times mr-2 remove-fdk-spatial'
            aria-label={translationsService.translate(prefLabel)}
            role='button'
            tabIndex={0}
            onClick={removePlace(index)}
            onKeyPress={removePlace(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations,
  withKartverket
)(SpatialTagsInputField);
