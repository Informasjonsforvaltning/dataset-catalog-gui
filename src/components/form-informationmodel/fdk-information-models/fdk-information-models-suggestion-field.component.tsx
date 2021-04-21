import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import Autosuggest from 'react-autosuggest';

import env from '../../../env';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import {
  extractSuggestions,
  getInformationModelSuggestions
} from '../../../services/api/fulltext-search/suggestions';

import Translation from '../../translation';

import { informationModelType } from '../../../schemaTypes';

import { insertTestId } from '../../../../test/utils/testUtils';

import '../form-informationmodel.component.scss';

const { FDK_BASE_URI } = env;

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

interface ExternalProps {
  addInformationModel: (informationModel: any) => void;
}

interface Props extends ExternalProps, TranslationsProps {}

const FdkInformationModelsSuggestionField: FC<Props> = ({
  addInformationModel,
  translationsService
}) => {
  const [value, setValue] = useState('');
  const [lastRequestId, setLastRequestId] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (_: any, { newValue }: any) => setValue(newValue);

  const fetchSuggestions = ({ value: q }: any) => {
    if (lastRequestId !== null) {
      clearTimeout(lastRequestId);
    }

    setLoading(true);

    getInformationModelSuggestions({ q })
      .then(extractSuggestions)
      .then(suggestionsResponse => {
        setLastRequestId(
          setTimeout(() => {
            setLoading(false);
            setSuggestions(suggestionsResponse);
          }, 250)
        );
      })
      .catch(() => {});
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = ({ title }: any) =>
    translationsService.translate(title);

  const onSuggestionSelected = (_: any, { suggestion }: any) => {
    addInformationModel({
      ...informationModelType,
      uri: `${FDK_BASE_URI}/informationmodels/${suggestion.id}`,
      prefLabel: suggestion.title
    });
    setValue('');
  };

  const renderSuggestion = ({ title, publisher }: any) => (
    <div className='d-flex mb-3' {...insertTestId(TestIds.suggestion)}>
      <span className='w-50 first' {...insertTestId(TestIds.suggestionTitle)}>
        <Translation object={title} />
      </span>
      <span className='w-50 ml-5' {...insertTestId(TestIds.publisherName)}>
        <Translation object={publisher.prefLabel || publisher.name} />
      </span>
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }: any) => (
    <div {...containerProps}>
      {children && children.props.items.length > 0 && (
        <div
          className='d-flex mb-3 react_autosuggest__suggestions-heading'
          {...insertTestId(TestIds.suggestionsHeader)}
        >
          <span className='w-50 first'>
            <strong>
              <Translation id='anbefaltTerm' />
            </strong>
          </span>
          <span className='w-50 ml-5'>
            <strong>
              <Translation id='responsible' />
            </strong>
          </span>
        </div>
      )}
      {isLoading && (
        <i
          className='fa fa-spinner fa-spin'
          style={{ position: 'absolute', right: '10px', top: '12px' }}
        />
      )}
      {children}
    </div>
  );

  const renderInputComponent = (inputProps: any) => (
    <input
      {...inputProps}
      className='form-control react-autosuggest__input'
      {...insertTestId(TestIds.input)}
    />
  );

  return (
    <div
      className='fdk-info-model-suggestions'
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

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FdkInformationModelsSuggestionField);
