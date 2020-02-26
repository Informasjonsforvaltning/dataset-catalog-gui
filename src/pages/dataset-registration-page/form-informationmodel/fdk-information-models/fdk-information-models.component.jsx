import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {
  extractInformationModels,
  searchInformationModels
} from '../../../../services/api/search-api/information-models';
import localization from '../../../../services/localization';
import { getTranslateText } from '../../../../services/translateText';
import { datasetFormPatchThunk } from '../../formsLib/asyncValidateDatasetInvokePatch';
import { getConfig } from '../../../../config';
import { informationModelType } from '../../../../schemaTypes';

import '../form-informationmodel.component.scss';

class FdkInformationModelsSuggestionField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', suggestions: [], loading: false };
    this.lastRequestId = null;
    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  fetchSuggestions({ value }) {
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoading: true
    });

    searchInformationModels({ q: value })
      .then(extractInformationModels)
      .then(models => {
        this.lastRequestId = setTimeout(() => {
          this.setState({
            isLoading: false,
            suggestions: models
          });
        }, 250);
      })
      .catch(console.error);
  }

  clearSuggestions() {
    this.setState({ suggestions: [] });
  }

  getSuggestionValue({ title }) {
    return getTranslateText(title);
  }

  onSuggestionSelected(event, { suggestion }) {
    this.props.addInformationModel({ 
      ...informationModelType, 
      uri: `${getConfig().searchHost}/informationmodels/${suggestion.id}`, 
      prefLabel: suggestion.title 
    });
    this.setState({ value: '' });
  }

  renderSuggestion({ title, publisher }) {
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

  renderSuggestionsContainer({ containerProps, children }) {
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
        {this.isLoading && (
          <i
            className="fa fa-spinner fa-spin"
            style={{ position: 'absolute', right: '10px', top: '12px' }}
          />
        )}
        {children}
      </div>
    );
  }

  renderInputComponent(inputProps) {
    return <input {...inputProps} className="form-control react-autosuggest__input" />;
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      type: 'text',
      onChange: this._onChange,
    };

    return (
      <div className="fdk-info-model-suggestions">
        <Autosuggest
          highlightFirstSuggestion={true}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.fetchSuggestions}
          onSuggestionsClearRequested={this.clearSuggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

FdkInformationModelsSuggestionField.defaultProps = {
  addInformationModel: null,
};

FdkInformationModelsSuggestionField.propTypes = {
  addInformationModel: PropTypes.func,
};

const FdkInformationModels = ({
  fields,
  isReadOnly,
  dispatch,
  catalogId,
  datasetId
}) => {

  const patchInformationModels = (models) => {
    const patch = { [fields.name]: models };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const removeModelAtIndex = (index) => {
    const models = fields.getAll();
    models.splice(index, 1);
    patchInformationModels(models);
  };

  const addModel = (model) => {
    const models = fields.getAll();
    models.push(model);
    patchInformationModels(models);
  };

  const isFdkURI = (uri) => uri && uri.includes(`${getConfig().searchHost}/informationmodels/`);

  return (
    <div className="fdk-info-models">
      {!isReadOnly &&
        <FdkInformationModelsSuggestionField addInformationModel={addModel} />
      }
      {fields &&
        fields.map((item, index) => (
          <div key={`external-info-model-${item}`} className={isFdkURI(fields.get(index).uri) ? "fdk-info-model-pill" : "display-none"}>
            <span className="fdk-info-model-pill-label">{getTranslateText(fields.get(index).prefLabel)}</span>
            {!isReadOnly &&
              <i
                className="fa fa-times mr-2 remove-fdk-info-model"
                role="button"
                tabIndex="0"
                onClick={() => removeModelAtIndex(index) }
                onKeyPress={e => {
                  removeModelAtIndex(index);
                  e.preventDefault();
                }}
              />
            }
          </div>
        ))
      }
    </div>
  );

}

FdkInformationModels.defaultProps = {
  fields: null,
  isReadOnly: false,
  dispatch: null,
  catalogId: null,
  datasetId: null,
};

FdkInformationModels.propTypes = {
  fields: PropTypes.object,
  isReadOnly: PropTypes.bool,
  dispatch: PropTypes.func,
  catalogId: PropTypes.string,
  datasetId: PropTypes.string
};

export default FdkInformationModels;
