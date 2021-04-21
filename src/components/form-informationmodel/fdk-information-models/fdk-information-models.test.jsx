import React from 'react';
import { shallow } from 'enzyme';

import env from '../../../env';

import FdkInformationModels, {
  TestIds
} from './fdk-information-models.component';

import { findByTestId } from '../../../../test/utils/testUtils';

const { FDK_BASE_URI } = env;

const fdkURI = `${FDK_BASE_URI}/informationmodels/`;

function setup(fields) {
  const wrapper = shallow(
    <FdkInformationModels
      fields={fields}
      isReadOnly={false}
      dispatch={() => {}}
      catalogId='1'
      datasetId='2'
    />
  );
  return wrapper;
}

const createFields = fieldArray => ({
  map: callback =>
    fieldArray.map((field, index) => callback(`item[${index}]`, index)),
  get: index => fieldArray[index]
});

describe('FdkInformationModels content', () => {
  it('should render without error', () => {
    const wrapper = setup(createFields([]));
    const component = findByTestId(wrapper, TestIds.component);
    expect(component.length).toBe(1);
  });
  it('should render no pills on empty field array', () => {
    const wrapper = setup(createFields([]));
    const pills = findByTestId(wrapper, TestIds.pill);
    expect(pills.length).toBe(0);
  });
  it('should render pills equal to amount of fields, and hide non fdk fields', () => {
    const wrapper = setup(
      createFields([
        { uri: `${fdkURI}fdkone`, prefLabel: 'fdk-one' },
        { uri: `${fdkURI}fdktwo`, prefLabel: 'fdk-two' },
        { uri: 'https://www.invalid.no/notfdk', prefLabel: 'not-fdk' }
      ])
    );
    const pills = findByTestId(wrapper, TestIds.pill);
    expect(pills.length).toBe(3);

    const displayedPills = pills.filterWhere(
      pill => !pill.hasClass('display-none')
    );
    expect(displayedPills.length).toBe(2);

    expect(
      displayedPills.filterWhere(pill => pill.text() === 'fdk-one').length
    ).toBe(1);
    expect(
      displayedPills.filterWhere(pill => pill.text() === 'fdk-two').length
    ).toBe(1);
  });
});
