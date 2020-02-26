import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../../../../test/utils/testUtils';
import FdkInformationModelsSuggestionField from './fdk-information-models-suggestion-field.component';

export const DatasetFdkInformationModelsSuggestionTestIds = { component: 'dataset-fdk-information-models-suggestions' };

function mockFunction() {}

function setup() {
  const wrapper = shallow(<FdkInformationModelsSuggestionField addInformationModel={() => {}} />);
  return wrapper;
}

describe('FdkInformationModelsSuggestionField content', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it('should render without error', () => {
    const component = findByTestId(
      wrapper,
      'dataset-fdk-information-models-suggestions'
    );
    expect(component.length).toBe(1);
  });
});
