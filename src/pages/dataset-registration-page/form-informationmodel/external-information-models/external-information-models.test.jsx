import React from 'react';
import { shallow } from 'enzyme';
import ExternalInformationModels from './external-information-models.component';

test('should render ExternalInformationModels correctly', () => {
  expect(shallow(<ExternalInformationModels />)).toMatchSnapshot();
});
