import React from 'react';
import { mount } from 'enzyme';
import { findByTestId } from '../../../../../test/utils/testUtils';
import * as searchApi from '../../../../services/api/search-api/information-models';
import FdkInformationModelsSuggestionField from './fdk-information-models-suggestion-field.component';
import { DatasetFdkInformationModelsSuggestionTestIds } from './fdk-information-models-suggestion-field.component';

function setup() {
  const wrapper = mount(<FdkInformationModelsSuggestionField addInformationModel={() => {}} />);
  return wrapper;
}

const searchSpy = jest.spyOn(searchApi, 'searchInformationModels').mockImplementation((input) => new Promise((resolve, reject) => resolve('modell')));
const extractSpy = jest.spyOn(searchApi, 'extractInformationModels').mockImplementation((extractFrom) => {
  return new Promise((resolve, reject) => resolve([{title: 'title', publisher: {name: 'name'}}]));
});

describe('FdkInformationModelsSuggestionField content', () => {
  let wrapper;
  beforeEach(() => {
    searchSpy.mockClear();
    extractSpy.mockClear();
    wrapper = setup();
  });
  it('should render without error', () => {
    const component = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.component
    );
    expect(component.length).toBe(1);
  });
  it('should not render suggestions in default state', () => {
    const suggestionsHeader = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestionsHeader
    );
    const suggestions = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestion
    );
    expect(suggestionsHeader.length).toBe(0);
    expect(suggestions.length).toBe(0);
  });
  it('should not render suggestions on input when in focus, but with no found suggestions', () => {
    const input = findByTestId(wrapper, DatasetFdkInformationModelsSuggestionTestIds.input);
    input.simulate('click');
    const suggestionsHeader = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestionsHeader
    );
    const suggestions = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestion
    );
    expect(suggestionsHeader.length).toBe(0);
    expect(suggestions.length).toBe(0);
  });
  it('should not render list of suggestions on input with found suggestions', () => {
    const input = findByTestId(wrapper, DatasetFdkInformationModelsSuggestionTestIds.input);
    input.simulate('click');
    input.simulate('change', {target: {value: 'model'}});
    const suggestionsHeader = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestionsHeader
    );
    const suggestions = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestion
    );
    setTimeout(() => {
      expect(suggestionsHeader.length).toBe(1);
      expect(suggestions.length).toBe(1);
    }, 300);
  });
  it('should render list of suggestions on input with found suggestions', () => {
    const input = findByTestId(wrapper, DatasetFdkInformationModelsSuggestionTestIds.input);
    input.simulate('click');
    input.simulate('change', {target: {value: 'model'}});
    const suggestionsHeader = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestionsHeader
    );
    const suggestions = findByTestId(
      wrapper,
      DatasetFdkInformationModelsSuggestionTestIds.suggestion
    );
    setTimeout(() => {
      expect(suggestionsHeader.length).toBe(1);
      expect(suggestions.length).toBe(1);
      findByTestId(wrapper, DatasetFdkInformationModelsSuggestionTestIds.component).simulate('click');
      expect(suggestionsHeader.length).toBe(0);
      expect(suggestions.length).toBe(0);
    }, 300);
  });
});
