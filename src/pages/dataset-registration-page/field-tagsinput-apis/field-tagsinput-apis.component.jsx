import React from 'react';
import ReactTags from 'react-tag-autocomplete';

import TranslationsService from '../../../services/translations';

import {
  extractSuggestions,
  getDataserviceSuggestions
} from '../../../services/api/fulltext-search/suggestions';

const addTagToInput = (updates, { input: { value, onChange } }) =>
  onChange(
    (value || []).concat({
      id: updates.id,
      description: {
        [TranslationsService.getLanguage()]: updates.name
      },
      endpointDescription: [
        {
          uri: updates.id
        }
      ]
    })
  );

const removeTagFromInput = (index, { input: { value = [], onChange } }) => {
  value.splice(index, 1);
  onChange(value);
};

export class InputTagsAPIsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: []
    };
    this.loadSuggestions = this.loadSuggestions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const {
      input: { value: accessService }
    } = this.props;
    if (accessService) {
      const accessServices = Array.isArray(accessService)
        ? accessService
        : [accessService];

      this.setState({
        tags: accessServices.filter(Boolean).map(({ id, description }) => ({
          id,
          name: TranslationsService.translate(description)
        }))
      });
    }
  }

  handleDelete(i) {
    const { tags } = this.state;
    const newTags = [...tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
    removeTagFromInput(i, this.props);
  }

  handleAddition(tag) {
    const { tags } = this.state;
    this.setState({ tags: [...tags, tag] });
    addTagToInput(tag, this.props);
  }

  handleInputChange(input) {
    this.loadSuggestions(input);
  }

  loadSuggestions(value) {
    const suggestionItems = [];

    getDataserviceSuggestions({
      q: value
    })
      .then(extractSuggestions)
      .then(suggestions => {
        suggestions.forEach(suggestion => {
          suggestionItems.push({
            id: suggestion.id,
            name: TranslationsService.translate(suggestion.title)
          });
        });
        this.setState({
          suggestions: suggestionItems
        });
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('error', error); // eslint-disable-line no-console
        }
      });
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div className='pl-2'>
        <div className='d-flex align-items-center'>
          <ReactTags
            autofocus={false}
            placeholder=''
            tags={tags}
            minQueryLength={1}
            suggestions={suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleInputChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

InputTagsAPIsField.defaultProps = {
  input: null
};
