import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Button } from 'reactstrap';

import Translation from '../../translation';

interface ExternalProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  confirmButtonText: string;
}

interface Props extends ExternalProps {}

const ConfirmDialog: FC<Props> = ({
  onConfirm,
  onCancel,
  confirmText,
  confirmButtonText
}) => (
  <div className='form-status-bar-overlay d-flex align-items-center justify-content-between alert-danger'>
    <div>
      <span>{confirmText}</span>
    </div>
    <div>
      <Button className='fdk-button mr-3' color='primary' onClick={onConfirm}>
        {confirmButtonText}
      </Button>
      <button
        type='button'
        className='btn bg-transparent fdk-color-link'
        onClick={onCancel}
      >
        <Translation id='formStatus.cancelDelete' />
      </button>
    </div>
  </div>
);

export default compose<FC<ExternalProps>>(memo)(ConfirmDialog);
