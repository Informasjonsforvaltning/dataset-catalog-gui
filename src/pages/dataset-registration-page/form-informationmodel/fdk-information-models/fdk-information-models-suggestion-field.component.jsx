import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {
  extractSuggestions,
  getInformationModelSuggestions
} from '../../../../services/api/fulltext-search/suggestions';
import localization from '../../../../services/localization';
import { getTranslateText } from '../../../../services/translateText';
import { getConfig } from '../../../../config';
import { informationModelType } from '../../../../schemaTypes';
import { insertTestId } from '../../../../../test/utils/testUtils';

import '../form-informationmodel.component.scss';

export const TestIds = {
  component: 'dataset-fdk-information-models-suggestion-field',
  suggestion: 'dataset-fdk-information-models-suggestion-field-suggestion',
  suggestionsHeader:
    'dataset-fdk-information-models-suggestion-field-suggestions-header',
  input: 'dataset-fdk-information-models-suggestion-field-input',
  suggestionTitle:
    'dataset-fdk-information-models-suggestion-field-suggestion-title',
  publisherName:
    'dataset-fdk-information-models-suggestion-field-publisher-name'
};

const FdkInformationModelsSuggestionField = ({ addInformationModel }) => {
  const [value, setValue] = useState('');
  const [lastRequestId, setLastRequestId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const fetchSuggestions = ({ value }) => {
    if (lastRequestId !== null) {
      clearTimeout(lastRequestId);
    }

    setLoading(true);

    getInformationModelSuggestions({
      q: value
    })
      .then(extractSuggestions)
      .then(suggestions => {
        setLastRequestId(
          setTimeout(() => {
            setLoading(false);
            setSuggestions(suggestions);
          }, 250)
        );
      })
      .catch(console.error);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = ({ title }) => {
    return getTranslateText(title);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    addInformationModel({
      ...informationModelType,
      uri: `${getConfig().searchHost}/informationmodels/${suggestion.id}`,
      prefLabel: suggestion.title
    });
    setValue('');
  };

  const renderSuggestion = ({ title, publisher }) => {
    return (
      <div className="d-flex mb-3" {...insertTestId(TestIds.suggestion)}>
        <span className="w-50 first" {...insertTestId(TestIds.suggestionTitle)}>
          {getTranslateText(title)}
        </span>
        <span className="w-50 ml-5" {...insertTestId(TestIds.publisherName)}>
          {getTranslateText(publisher.prefLabel || publisher.name)}
        </span>
      </div>
    );
  };

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div {...containerProps}>
        {children && children.props.items.length > 0 && (
          <div
            className="d-flex mb-3 react_autosuggest__suggestions-heading"
            {...insertTestId(TestIds.suggestionsHeader)}
          >
            <span className="w-50 first">
              <strong>{localization.anbefaltTerm}</strong>
            </span>
            <span className="w-50 ml-5">
              <strong>{localization.responsible}</strong>
            </span>
          </div>
        )}
        {isLoading && (
          <i
            className="fa fa-spinner fa-spin"
            style={{ position: 'absolute', right: '10px', top: '12px' }}
          />
        )}
        {children}
      </div>
    );
  };

  const renderInputComponent = inputProps => {
    return (
      <input
        {...inputProps}
        className="form-control react-autosuggest__input"
        {...insertTestId(TestIds.input)}
      />
    );
  };

  return (
    <div
      className="fdk-info-model-suggestions"
      {...insertTestId(TestIds.component)}
    >
      <Autosuggest
        highlightFirstSuggestion
        suggestions={suggestions}
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
    </div>
  );
};

FdkInformationModelsSuggestionField.defaultProps = {
  addInformationModel: null
};

FdkInformationModelsSuggestionField.propTypes = {
  addInformationModel: PropTypes.func
};

export default FdkInformationModelsSuggestionField;
