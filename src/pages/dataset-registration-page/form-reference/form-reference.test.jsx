import React from 'react';
import { shallow } from 'enzyme';
import FormReference from './form-reference.component';

let defaultProps;
let wrapper;

beforeEach(() => {
  defaultProps = {
    initialValues: {}
  };
  wrapper = shallow(<FormReference {...defaultProps} />);
});

test('should render FormReference correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
