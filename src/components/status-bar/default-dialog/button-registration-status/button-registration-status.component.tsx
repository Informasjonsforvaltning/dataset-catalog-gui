import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Button } from 'reactstrap';

import Translation from '../../../translation';

interface ExternalProps {
  onChange: (status: string) => void;
  published: boolean;
  allowPublish: boolean;
  onShowValidationError: () => void;
}

interface Props extends ExternalProps {}

const ButtonRegistrationStatus: FC<Props> = ({
  onChange,
  published,
  allowPublish = true,
  onShowValidationError
}) => {
  if (!published && allowPublish) {
    return (
      <Button
        id='dataset-setPublish-button'
        className='fdk-button mr-3'
        color='primary'
        onClick={() => onChange('PUBLISH')}
      >
        <Translation id='formStatus.publish' />
      </Button>
    );
  }

  if (!allowPublish) {
    return (
      <Button
        id='dataset-setPublish-button'
        className='fdk-button mr-3'
        color='primary'
        onClick={onShowValidationError}
      >
        <Translation id='formStatus.publish' />
      </Button>
    );
  }

  return (
    <Button
      id='dataset-setDraft-button'
      className='fdk-button shadow-none bg-transparent btn-outline-primary mr-3'
      onClick={() => onChange('DRAFT')}
    >
      <Translation id='formStatus.unPublish' />
    </Button>
  );
};

export default compose<FC<ExternalProps>>(memo)(ButtonRegistrationStatus);
