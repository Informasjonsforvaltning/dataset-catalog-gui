import React, { memo, FC } from 'react';
import { compose } from 'redux';

import Translation from '../translation';

import './registration-status.scss';

interface ExternalProps {
  registrationStatus?: 'DRAFT' | 'APPROVE' | 'PUBLISH';
}

interface Props extends ExternalProps {}

const statusAndIcon = {
  DRAFT: {
    icon: 'icon-draft-circle-md.svg',
    label: 'formStatus.draft'
  },
  APPROVE: {
    icon: 'icon-approved-circle-md.svg',
    label: 'formStatus.approveChecked'
  },
  PUBLISH: {
    icon: 'icon-published-circle-md.svg',
    label: 'formStatus.publishChecked'
  }
};

const RegistrationStatus: FC<Props> = ({ registrationStatus = 'DRAFT' }) => {
  const { icon, label } = statusAndIcon[registrationStatus];

  return (
    <div className='fdk-registration-status'>
      <img src={`/img/${icon}`} className='mr-2' alt='icon' />
      <span>
        <Translation id={label} />
      </span>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(RegistrationStatus);
