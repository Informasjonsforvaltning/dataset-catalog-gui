import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {
  extractInformationModels,
  searchInformationModels
} from '../../../../services/api/search-api/information-models';
import localization from '../../../../services/localization';
import { getTranslateText } from '../../../../services/translateText';
import { getConfig } from '../../../../config';
import { informationModelType } from '../../../../schemaTypes';
import { insertTestId } from '../../../../../test/utils/testUtils';
import {DatasetFdkInformationModelsSuggestionTestIds} from './fdk-information-models-suggestion-field.test';

import '../form-informationmodel.component.scss';

const FdkInformationModelsSuggestionField = ({ addInformationModel }) => {

  const [value, setValue] = useState('');
  const [lastRequestId, setLastRequestId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => { 
    setValue(newValue); 
  } 

  const fetchSuggestions = ({ value }) => {
    if (lastRequestId !== null) {
      clearTimeout(lastRequestId);
    }

    setLoading(true);

    searchInformationModels({ q: value })
      .then(extractInformationModels)
      .then(models => {
        setLastRequestId(setTimeout(() => {
          setLoading(false);
          setSuggestions(models);
        }, 250));
      })
      .catch(console.error);
  }

  const clearSuggestions = () => {
    setSuggestions([]);
  }

  const getSuggestionValue = ({ title }) => {
    return getTranslateText(title);
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    addInformationModel({ 
      ...informationModelType, 
      uri: `${getConfig().searchHost}/informationmodels/${suggestion.id}`, 
      prefLabel: suggestion.title 
    });
    setValue('');
  }

  const renderSuggestion = ({ title, publisher }) => {
    return (
      <div className="d-flex mb-3">
        <span className="w-50 first">
          { getTranslateText(title) }
        </span>
        <span className="w-50 ml-5">
          { getTranslateText( publisher.prefLabel || publisher.name ) }
        </span>
      </div>
    );
  }

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div {...containerProps}>
        {children && children.length > 0 &&
          <div className="d-flex mb-3 react_autosuggest__suggestions-heading">
            <span className="w-50 first">
              <strong>{localization.anbefaltTerm}</strong>
            </span>
            <span className="w-50 ml-5">
              <strong>{localization.responsible}</strong>
            </span>
          </div>
        }
        {isLoading && (
          <i
            className="fa fa-spinner fa-spin"
            style={{ position: 'absolute', right: '10px', top: '12px' }}
          />
        )}
        {children}
      </div>
    );
  }

  const renderInputComponent = (inputProps) => {
    return <input {...inputProps} className="form-control react-autosuggest__input" />;
  };

  return (
    <div className="fdk-info-model-suggestions" {...insertTestId(DatasetFdkInformationModelsSuggestionTestIds.component)}>
      <Autosuggest
        highlightFirstSuggestion={true}
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
}

FdkInformationModelsSuggestionField.defaultProps = {
  addInformationModel: null,
};

FdkInformationModelsSuggestionField.propTypes = {
  addInformationModel: PropTypes.func,
};

export default FdkInformationModelsSuggestionField;
