import React from 'react';
import { shallow } from 'enzyme';
import { DatasetRegistrationPagePure } from './dataset-registration-page-pure';

let defaultProps;
let wrapper;
let dispatch;

beforeEach(() => {
  dispatch = jest.fn();
  const fetchDatasetsIfNeeded = jest.fn();
  const fetchProvenanceIfNeeded = jest.fn();
  const fetchFrequencyIfNeeded = jest.fn();
  const fetchThemesIfNeeded = jest.fn();
  const fetchReferenceTypesIfNeeded = jest.fn();
  const fetchReferenceDatasetsIfNeeded = jest.fn();
  const fetchOpenLicensesIfNeeded = jest.fn();
  const datasetsActions = jest.fn();
  defaultProps = {
    dispatch,
    fetchDatasetsIfNeeded,
    fetchProvenanceIfNeeded,
    fetchFrequencyIfNeeded,
    fetchThemesIfNeeded,
    fetchReferenceTypesIfNeeded,
    fetchReferenceDatasetsIfNeeded,
    fetchOpenLicensesIfNeeded,
    isFetching: false,
    datasetsActions
  };
  wrapper = shallow(<DatasetRegistrationPagePure {...defaultProps} />);
});

test('should render DatasetRegistrationPagePure correctly', () => {
  expect(wrapper).toHaveLength(1);
  expect(wrapper).toMatchSnapshot();
});
