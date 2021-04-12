import React, { memo, FC } from 'react';
import { compose } from 'redux';

import Translation from '../../translation';

interface ExternalProps {
  type: 'dataset' | 'api';
  onCancel: () => void;
}

interface Props extends ExternalProps {}

const ValidationErrorDialog: FC<Props> = ({ type, onCancel }) => (
  <div className='form-status-bar-overlay d-flex align-items-center justify-content-between alert-danger'>
    <div>
      <span>
        <Translation id={`formStatus.${type}.requiredFieldsMissing`} />
      </span>
    </div>
    <div>
      <button
        type='button'
        className='btn bg-transparent fdk-color-link'
        onClick={onCancel}
      >
        <Translation id='app.cancel' />
      </button>
    </div>
  </div>
);

export default compose<FC<ExternalProps>>(memo)(ValidationErrorDialog);
