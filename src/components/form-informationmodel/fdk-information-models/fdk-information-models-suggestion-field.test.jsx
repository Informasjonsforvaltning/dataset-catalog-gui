import React from 'react';
import { mount } from 'enzyme';
import { findByTestId } from '../../../../test/utils/testUtils';
import * as informationModelSuggestion from '../../../services/api/fulltext-search/suggestions';
import FdkInformationModelsSuggestionField, {
  TestIds
} from './fdk-information-models-suggestion-field.component';

function setup() {
  const wrapper = mount(
    <FdkInformationModelsSuggestionField addInformationModel={() => {}} />
  );
  return wrapper;
}

const searchSpy = jest
  .spyOn(informationModelSuggestion, 'getInformationModelSuggestions')
  .mockImplementation(() => new Promise(resolve => resolve('modell')));
const extractSpy = jest
  .spyOn(informationModelSuggestion, 'extractSuggestions')
  .mockImplementation(
    () =>
      new Promise(resolve =>
        resolve([{ title: 'title', publisher: { name: 'name' } }])
      )
  );

describe('FdkInformationModelsSuggestionField content', () => {
  let wrapper;
  beforeEach(() => {
    searchSpy.mockClear();
    extractSpy.mockClear();
    wrapper = setup();
  });
  it('should render without error', () => {
    const component = findByTestId(wrapper, TestIds.component);
    expect(component.length).toBe(1);
  });
  it('should not render suggestions in default state', () => {
    const suggestionsHeader = findByTestId(wrapper, TestIds.suggestionsHeader);
    const suggestions = findByTestId(wrapper, TestIds.suggestion);
    expect(suggestionsHeader.length).toBe(0);
    expect(suggestions.length).toBe(0);
  });
  it('should not render suggestions on input when in focus, but with no found suggestions', () => {
    const input = findByTestId(wrapper, TestIds.input);
    input.simulate('focus');
    const suggestionsHeader = findByTestId(wrapper, TestIds.suggestionsHeader);
    const suggestions = findByTestId(wrapper, TestIds.suggestion);
    expect(suggestionsHeader.length).toBe(0);
    expect(suggestions.length).toBe(0);
  });
  it('should render list of suggestions on input with found suggestions, but is not in focus', done => {
    const input = findByTestId(wrapper, TestIds.input);
    input.simulate('change', { target: { value: 'model' } });
    setTimeout(() => {
      wrapper.update();

      const suggestionsHeader = findByTestId(
        wrapper,
        TestIds.suggestionsHeader
      );
      const suggestions = findByTestId(wrapper, TestIds.suggestion);

      expect(suggestionsHeader.length).toBe(0);
      expect(suggestions.length).toBe(0);

      done();
    }, 300);
  });
  it('should render list of suggestions on input with found suggestions and is in focus', done => {
    const input = findByTestId(wrapper, TestIds.input);
    input.simulate('change', { target: { value: 'model' } });
    input.simulate('focus');
    setTimeout(() => {
      wrapper.update();

      const suggestionsHeader = findByTestId(
        wrapper,
        TestIds.suggestionsHeader
      );
      const suggestions = findByTestId(wrapper, TestIds.suggestion);

      expect(suggestionsHeader.length).toBe(1);
      expect(suggestions.length).toBe(1);

      const suggestionTitles = findByTestId(wrapper, TestIds.suggestionTitle);
      const publisherNames = findByTestId(wrapper, TestIds.publisherName);

      expect(suggestionTitles.length).toBe(1);
      expect(suggestionTitles.first().text()).toBe('title');

      expect(publisherNames.length).toBe(1);
      expect(publisherNames.first().text()).toBe('name');

      done();
    }, 300);
  });
});
