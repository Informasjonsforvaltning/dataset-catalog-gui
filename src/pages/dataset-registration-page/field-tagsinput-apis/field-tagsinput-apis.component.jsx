import React from 'react';
import _ from 'lodash';
import ReactTags from 'react-tag-autocomplete';

import { getTranslateText } from '../../../services/translateText';
import { searchApis } from '../../../services/api/search-api/apis';
import localization from '../../../services/localization';

const addTagToInput = (updates, { input: { value, onChange } }) =>
  onChange(
    (value || []).concat({
      id: updates.id,
      description: {
        [localization.getLanguage()]: updates.name
      },
      endpointDescription: [
        {
          uri: updates.id
        }
      ]
    })
  );

const removeTagFromInput = (index, { input: value = [], onChange }) => {
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
    if (accessService && Array.isArray(accessService)) {
      this.setState({
        tags: accessService.map(({ id, description }) => ({
          id,
          name: getTranslateText(description)
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

    searchApis({ title: value, returnFields: 'title,id' })
      .then(responseData => {
        _.get(responseData, 'hits', []).forEach(item => {
          suggestionItems.push({
            id: _.get(item, 'id'),
            name: _.get(item, 'title')
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
      <div className="pl-2">
        <div className="d-flex align-items-center">
          <ReactTags
            autofocus={false}
            placeholder=""
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
