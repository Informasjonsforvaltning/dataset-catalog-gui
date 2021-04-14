import React from 'react';
import { shallow } from 'enzyme';
import FormDistributionPure from './form-distribution-pure';
import { distributionTypes } from './distribution-types';
import openlicenses from '../../../../test/fixtures/openlicenses';
import distribution from '../../../../test/fixtures/distributions';

let defaultProps;
let wrapper;

beforeEach(() => {
  const { openLicenseItems } = openlicenses;
  defaultProps = {
    initialValues: {
      distribution: distributionTypes(distribution),
      openLicenseItems
    }
  };
  wrapper = shallow(<FormDistributionPure {...defaultProps} />);
});

test('should render FormDistributionPure correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
