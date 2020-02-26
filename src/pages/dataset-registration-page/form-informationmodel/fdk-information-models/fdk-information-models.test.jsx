import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../../../../test/utils/testUtils';
import FdkInformationModels from './fdk-information-models.component';

export const DatasetFdkInformationModelsTestIds = { component: 'dataset-fdk-information-models' };

function mockFunction() {}

function setup() {
  const wrapper = shallow(<FdkInformationModels isReadOnly={false} dispatch={mockFunction} catalogId={'1'} datasetId={'2'}/>);
  return wrapper;
}

describe('FdkInformationModels content', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it('should render without error', () => {
    const component = findByTestId(
      wrapper,
      DatasetFdkInformationModelsTestIds.component
    );
    expect(component.length).toBe(1);
  });
});
