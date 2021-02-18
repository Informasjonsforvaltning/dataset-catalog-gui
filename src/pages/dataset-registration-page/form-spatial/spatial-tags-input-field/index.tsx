import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import Autosuggest from 'react-autosuggest';

import localization from '../../../../services/localization';
import { getTranslateText as translate } from '../../../../services/translateText';

import withKartverket, {
  Props as KartverketProps
} from '../../../../components/with-kartverket';

import TagsInputFieldArrayReadOnly from '../../../../components/fields/field-input-tags-objects-readonly/field-input-tags-objects-readonly.component';

import './styles.scss';

import type { AdministrativeUnit } from '../../../../types';
import { AdministrativeUnitType } from '../../../../types/enums';

interface ExternalProps extends WrappedFieldProps {
  isReadOnly?: boolean;
  onUpdateAdministrativeUnits: (
    administrativeUnits: AdministrativeUnit[]
  ) => void;
}

interface Props extends ExternalProps, KartverketProps {}

const SpatialTagsInputField: FC<Props> = ({
  input,
  isReadOnly,
  administrativeUnitSuggestions,
  kartverketActions: {
    searchAdministrativeUnitsRequested: searchAdministrativeUnits,
    clearAdministrativeUnitsSearchSuggestions: clearSuggestions
  },
  onUpdateAdministrativeUnits
}) => {
  const [value, setValue] = useState('');

  const removePlace = (index: number) => () => {
    input.value.splice(index, 1);
    onUpdateAdministrativeUnits(input.value);
  };

  const onChange = (event, { newValue, method }) => {
    if (method === 'type') {
      setValue(newValue ?? '');
    }
  };

  const fetchSuggestions = ({ value: name }) =>
    searchAdministrativeUnits(name ?? '', 5);

  const onSuggestionSelected = (event, { suggestion }) => {
    if (!input.value?.find(({ uri }) => uri === suggestion.uri)) {
      input.value.push({
        uri: suggestion.uri,
        extraType: suggestion.type,
        prefLabel: { nb: suggestion.name }
      });

      onUpdateAdministrativeUnits(
        input.value.filter(v => Object.entries(v).length > 0)
      );

      setValue('');
    }
  };

  const getSuggestionValue = ({ title }) => translate(title);

  const renderSuggestion = ({ name, type }: AdministrativeUnit) => (
    <div className="d-flex mb-3 suggestion">
      <span>{name}</span>
      {type === AdministrativeUnitType.MUNICIPALITY && (
        <span className="ml-5">
          {localization.administrativeUnit.municipality}
        </span>
      )}
      {type === AdministrativeUnitType.COUNTY && (
        <span className="ml-5">{localization.administrativeUnit.county}</span>
      )}
      {type === AdministrativeUnitType.NATION && (
        <span className="ml-5">{localization.administrativeUnit.nation}</span>
      )}
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => (
    <div {...containerProps}>
      {children && children.props.items.length > 0 && (
        <div className="d-flex mb-3 react_autosuggest__suggestions-heading">
          <span>
            <strong>{localization.administrativeUnit.name}</strong>
          </span>
          <span className="ml-5">
            <strong>{localization.administrativeUnit.type}</strong>
          </span>
        </div>
      )}
      {children}
    </div>
  );

  const renderInputComponent = inputProps => (
    <input {...inputProps} className="form-control react-autosuggest__input" />
  );

  return isReadOnly ? (
    <TagsInputFieldArrayReadOnly input={input} />
  ) : (
    <div className="fdk-spatial">
      <Autosuggest
        highlightFirstSuggestion
        focusFirstSuggestion
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
      {input.value?.map(({ uri, prefLabel }, index) => (
        <div
          key={`external-spatial-${uri}-${index}`}
          className="fdk-spatial-pill"
        >
          <span className="fdk-spatial-pill-label">{translate(prefLabel)}</span>
          <i
            className="fa fa-times mr-2 remove-fdk-spatial"
            aria-label={translate(prefLabel)}
            role="button"
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
  withKartverket
)(SpatialTagsInputField);
