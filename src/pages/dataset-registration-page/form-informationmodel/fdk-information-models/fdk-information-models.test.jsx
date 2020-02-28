import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../../../../test/utils/testUtils';
import FdkInformationModels from './fdk-information-models.component';
import { getConfig } from '../../../../config';
import { DatasetFdkInformationModelsTestIds } from './fdk-information-models.component';

const fdkURI = `${getConfig().searchHost}/informationmodels/`;

function setup(fields) {
  const wrapper = shallow(<FdkInformationModels fields={fields} isReadOnly={false} dispatch={() => {}} catalogId={'1'} datasetId={'2'}/>);
  return wrapper;
}

const createFields = (fieldArray) => {
  return {
    map: callback => fieldArray.map((field, index) => callback(`item[${index}]`, index)),
    get: (index) => fieldArray[index]
  }
}

describe('FdkInformationModels content', () => {
  it('should render without error', () => {
    const wrapper = setup(createFields([]));
    const component = findByTestId(
      wrapper,
      DatasetFdkInformationModelsTestIds.component
    );
    expect(component.length).toBe(1);
  });
  it('should render no pills on empty field array', () => {
    const wrapper = setup(createFields([]));
    const pills = findByTestId(
      wrapper,
      DatasetFdkInformationModelsTestIds.pill
    );
    expect(pills.length).toBe(0);
  });
  it('should render pills equal to amount of fields, and hide non fdk fields', () => {
    const wrapper = setup(
      createFields([
        {uri: `${fdkURI}fdkone`, prefLabel: 'fdk-one'},
        {uri: `${fdkURI}fdktwo`, prefLabel: 'fdk-two'},
        {uri: 'https://www.invalid.no/notfdk', prefLabel: 'not-fdk'},
      ])
    );
    const pills = findByTestId(
      wrapper,
      DatasetFdkInformationModelsTestIds.pill
    );
    expect(pills.length).toBe(3);
    expect(pills.filterWhere(pill => pill.hasClass("display-none")).length).toBe(1);
  });
});
