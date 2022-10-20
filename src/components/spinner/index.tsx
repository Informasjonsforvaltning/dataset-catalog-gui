import React from 'react';
import Icon from '../icon';

import SC from './styled';

// TODO: replace Icon with fdkSpinner
const Spinner: React.FC = () => (
  <SC.SpinnerContainer>
    <SC.Spinner>
      <Icon name='fdkSpinner' />
    </SC.Spinner>
  </SC.SpinnerContainer>
);

export default Spinner;
