import React from 'react';
import _ from 'lodash';
import ReactTags from 'react-tag-autocomplete';

import { getTranslateText } from '../../../services/translateText';
import { searchApis } from '../../../services/api/search-api/apis';
import localization from '../../../services/localization';

const addTagToInput = (updates, { input: { onChange } }) => {
  // NOTE: for now, we only accept one access service
  // inputValues.push({
  //   accessService: {
  //     description: {
  //       [localization.getLanguage()]: _.get(updates, ['name'])
  //     },
  //     endpointDescription: [
  //       {
  //         uri: _.get(updates, ['id'])
  //       }
  //     ]
  //   }
  // });
  // input.onChange(inputValues);

  // TODO: REVERT BACK TO 0..N

  onChange({
    description: {
      [localization.getLanguage()]: updates.name
    },
    endpointDescription: [
      {
        uri: updates.id
      }
    ]
  });
};

const removeTagFromInput = (index, props) => {
  const { input } = props;
  const distributions = input.value;

  // find distribution-apis among all distributions
  const distributionApis = _.reject(distributions, { accessService: null });
  // save all distributsions except the one deleted by index
  input.onChange(_.reject(distributions, distributionApis[index]));
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
      const { id, description } = accessService;
      this.setState({
        tags: [
          {
            id,
            name: getTranslateText(description)
          }
        ]
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
            inputAttributes={{
              disabled: tags.length > 0
            }}
          />
        </div>
      </div>
    );
  }
}

InputTagsAPIsField.defaultProps = {
  input: null
};
