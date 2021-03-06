import React from 'react';
import { shallow } from 'enzyme';
import { DatasetItemsListPure } from './dataset-item-list.component';
import datasetsResponse from '../../../mock/datasets.response.json';

const {
  _embedded: { datasets }
} = datasetsResponse;

let defaultProps;
let wrapper;

beforeEach(() => {
  defaultProps = {
    catalogId: '123'
  };
  wrapper = shallow(<DatasetItemsListPure {...defaultProps} />);
});

test('should render DatasetItemsList correctly with missing datasetItems', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render DatasetItemsList correctly with datasetItems', () => {
  wrapper.setProps({
    datasets
  });
  expect(wrapper).toMatchSnapshot();
});

test('should render DatasetItemsList correctly with missing items', () => {
  wrapper.setProps({
    datasets: null
  });
  expect(wrapper).toMatchSnapshot();
});
