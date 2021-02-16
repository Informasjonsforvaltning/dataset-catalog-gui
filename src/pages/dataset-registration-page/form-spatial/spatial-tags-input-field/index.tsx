import React, { memo, FC, useState, useEffect } from 'react';
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

import type { KartverketPlace } from '../../../../types';

interface ExternalProps extends WrappedFieldProps {
  isReadOnly?: boolean;
  onUpdatePlaces: (places: KartverketPlace[]) => void;
}

interface Props extends ExternalProps, KartverketProps {}

const SpatialTagsInputField: FC<Props> = ({
  input,
  isReadOnly,
  places: initialPlaces,
  placeSuggestions,
  kartverketActions: {
    listPlacesRequested: listPlaces,
    searchPlacesRequested: searchPlaces
  },
  onUpdatePlaces
}) => {
  const [value, setValue] = useState('');
  const [places, setPlaces] = useState<KartverketPlace[]>(initialPlaces);
  const [arePlacesFetched, setArePlacesFetched] = useState(false);

  useEffect(() => {
    listPlaces(input.value.map(({ uri }) => uri).filter(Boolean));
  }, []);

  useEffect(() => {
    if (!arePlacesFetched && initialPlaces.length > 0) {
      setPlaces(initialPlaces);
      setArePlacesFetched(true);
    }
  }, [initialPlaces]);

  const removePlace = (index: number) => () => {
    input.value.splice(index, 1);
    places.splice(index, 1);
    setPlaces(places);
    onUpdatePlaces(places);
  };

  const onChange = (event, { newValue }) => setValue(newValue ?? '');

  const fetchSuggestions = ({ value: name }) => searchPlaces(name ?? '', 5);

  const onSuggestionSelected = (event, { suggestion }) => {
    setPlaces([...places, suggestion]);
    input.value.push({ uri: suggestion.id });
    onUpdatePlaces(input.value);
    setValue('');
  };

  const clearSuggestions = () => setValue('');

  const getSuggestionValue = ({ title }) => translate(title);

  const renderSuggestion = ({
    name,
    type,
    municipality,
    county
  }: KartverketPlace) => (
    <div className="d-flex mb-3 suggestion">
      <span>{name}</span>
      <span className="ml-5">{type}</span>
      <span className="ml-5">{municipality}</span>
      <span className="ml-5">{county}</span>
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => (
    <div {...containerProps}>
      {children && children.props.items.length > 0 && (
        <div className="d-flex mb-3 react_autosuggest__suggestions-heading">
          <span>
            <strong>{localization.place.name}</strong>
          </span>
          <span className="ml-5">
            <strong>{localization.place.type}</strong>
          </span>
          <span className="ml-5">
            <strong>{localization.place.municipality}</strong>
          </span>
          <span className="ml-5">
            <strong>{localization.place.county}</strong>
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
        suggestions={placeSuggestions}
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
      {places.map(({ id, name }, index) => (
        <div
          key={`external-spatial-${id}-${index}`}
          className="fdk-spatial-pill"
        >
          <span className="fdk-spatial-pill-label">{name}</span>
          <i
            className="fa fa-times mr-2 remove-fdk-spatial"
            aria-label={name}
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
