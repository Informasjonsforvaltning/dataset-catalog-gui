import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
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
    this._onChange = this._onChange.bind(this);
    this._onSuggestionSelected = this._onSuggestionSelected.bind(this);
    this._fetchSuggestions = this._fetchSuggestions.bind(this);
    this._clearSuggestions = this._clearSuggestions.bind(this);
    this._renderSuggestion = this._renderSuggestion.bind(this);
    this._renderSuggestionsContainer = this._renderSuggestionsContainer.bind(this);
  }

  _onChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  _fetchSuggestions({ value }) {
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

  _clearSuggestions() {
    this.setState({ suggestions: [] });
  }

  _getSuggestionValue(suggestion) {
    return getTranslateText(_.get(suggestion, 'title'));
  }

  _onSuggestionSelected(event, { suggestion }) {
    var modelToAdd = informationModelType;
    modelToAdd.uri = `${getConfig().searchHost}/informationmodels/${suggestion.id}`;
    modelToAdd.prefLabel = suggestion.title;

    this.props.addInformationModel(modelToAdd);
    this.setState({ value: '' });
  }

  _renderSuggestion(suggestion) {
    return (
      <div className="d-flex mb-3">
        <span className="w-50 first">
          {getTranslateText(_.get(suggestion, 'title'))}
        </span>
        <span className="w-50 ml-5">
          {getTranslateText(
            _.get(suggestion, ['publisher', 'prefLabel']) ||
              _.get(suggestion, ['publisher', 'name'])
          )}
        </span>
      </div>
    );
  }

  _renderSuggestionsContainer({ containerProps, children }) {
    return (
      <div {...containerProps}>
        {children &&
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

  _renderInputComponent(inputProps) {
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
          onSuggestionsFetchRequested={this._fetchSuggestions}
          onSuggestionsClearRequested={this._clearSuggestions}
          onSuggestionSelected={this._onSuggestionSelected}
          getSuggestionValue={this._getSuggestionValue}
          renderSuggestion={this._renderSuggestion}
          renderSuggestionsContainer={this._renderSuggestionsContainer}
          renderInputComponent={this._renderInputComponent}
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

  const deleteFieldAtIndex = (index) => {
    const models = fields.getAll();
    // use splice instead of skip, for changing the bound value
    models.splice(index, 1);
    const patch = { [fields.name]: models };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const addModel = (model) => {
    const models = fields.getAll();
    models.push(model);
    const patch = { [fields.name]: models };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const isFdkURI = (uri) => uri && uri.includes(`${getConfig().searchHost}/informationmodels/`);

  return (
    <div className="fdk-info-models">
      {!isReadOnly && 
        <FdkInformationModelsSuggestionField addInformationModel={addModel} />
      }
      {fields &&
        fields.map((item, index) => (
          <div key={`info-model-${item}`} className={isFdkURI(fields.get(index).uri) ? "fdk-info-model-pill" : "display-none"}>
              <span className="fdk-info-model-pill-label">{getTranslateText(fields.get(index).prefLabel)}</span>
              {!isReadOnly && 
                <i 
                  className="fa fa-times mr-2 remove-fdk-info-model"
                  role="button"
                  tabIndex="0"
                  onClick={() => deleteFieldAtIndex(index)}
                  onKeyPress={e => {
                    deleteFieldAtIndex(index);
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
